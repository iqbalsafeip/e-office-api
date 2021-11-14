const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkUsername} = require('../utils');


function signUp(req,res) {
    models.User.findOne({where: {username: req.body.username}}).then(result => {
        if(result){
            return res.status(405).json({
                message: 'Username Already Exist'
            })
        } else {
            bcryptjs.genSalt(10, function(err, salt) {
                bcryptjs.hash(req.body.password, salt, async function(err,hash){
                    const user = {
                        username: req.body.username,
                        password: await hash,
                        pegawai_id: req.body.pegawai_id || null
                    }
                    console.log(hash);
                    if(!req.body.role_id){
                        await models.User_role.findOne({where : {role_name : 'pegawai'}}).then(result => {
                            if(result){
                                user.UserRoleId = result.id
                                console.log(result.id);
                            } else {
                                return res.status(404).json({
                                    message: 'Buat User Role dengan nama "pegawai"'
                                })
                            }
                        })
                    } else {
                        user.UserRoleId = req.body.role_id
                    }
                    
                    console.log(user);

                    await models.User.create(user).then(result => {
                        res.status(201).json({
                            message: 'User Successfully Singup!'
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: 'something went wrong!'
                        })
                    })
                })
            })
        }
    })
}

function login (req,res) {
    models.User.findOne({include: models.User_role, where: {username: req.body.username} }).then(result => {
        if(result){
            bcryptjs.compare(req.body.password, result.password, function(err, resultPwd){
                if(resultPwd){
                    const token = jwt.sign({
                        username: result.username,
                        role_detail: result.User_role,
                        pegawai_id: result.pegawai_id,
                        user_id: result.id
                    }, 'eoffice' , function(err,token){
                        res.status(200).json({
                            token: token,
                            message: 'login successful',
                            username: result.username,
                        })
                    })
                } else {
                    res.status(400).json({
                        message: 'password is incorrect'
                    })
                }
            })
        } else {
            res.status(404).json({
                message: 'user not found'
            })
        }
    }).catch(err => {
        res.status(400).json({
            message: 'something went wrong',
            error : err
        })
    })
}

function destroy(req, res){
    const id = req.params.id;
    models.User.destroy({where: {id: id}}).then(result =>{
        if(result){
            res.status(200).json({
                message : "Success to delete"
            })
        } else {
            res.status(404).json({
                message : "Data Not Found",
            })
        }
    }).catch(result =>{
        res.status(500).json({
            message : "failed to delete",
            data: result
        })
    })
}

function index(req,res){
    if(!req.query.pegawai){
        models.User.findAll({include: [models.User_role, models.tbl_pegawai]}).then(result =>{
            if(result.length === 0){
                res.status(404).json({
                    message: "Data Not Found"
                })
            } else {
                res.status(200).json({
                    data: result
                })
            }
        }).catch(result =>{
            res.status(500).json({
                message : "failed to get",
                data: result
            })
        })
    } else {
        models.User.findOne({where : {pegawai_id : parseInt(req.query.pegawai)}, attributes: ['id', 'username', 'pegawai_id', 'is_active']}).then((result)=>{
            if(!result){
                res.status(404).json({
                    message: "Data Not Found",
                    data : req.query
                })
            } else {
                res.status(200).json({
                    data: result
                })
            }
        })
    }
}

async function update(req, res){
    const id = req.params.id;
    let temp = req.body
    if(temp.password !== ''){
        await bcryptjs.genSalt(10, function(err, salt) {
            bcryptjs.hash(req.body.password, salt, function(err,hash){
                temp = {...temp, password: hash }
                models.User.update(temp, {where: {id: id}}).then(result =>{
                    if(result === null){
                        res.status(404).json({
                            message : "Data Not Found",
                        })
                    } else {
                        res.status(200).json({
                            message : "Success to update",
                            data: req.body
                        })
                    }
                }).catch(result =>{
                    res.status(500).json({
                        message : "failed to update",
                    })
                })
            })
        })
    } else {
        models.User.update(temp, {where: {id: id}}).then(result =>{
            if(result === null){
                res.status(404).json({
                    message : "Data Not Found",
                })
            } else {
                res.status(200).json({
                    message : "Success to update",
                    data: req.body
                })
            }
        }).catch(result =>{
            res.status(500).json({
                message : "failed to update",
            })
        })
    }  
}

module.exports = {
    signUp,
    login,
    destroy,
    index,
    update
};