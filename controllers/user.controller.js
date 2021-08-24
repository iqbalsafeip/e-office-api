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
        }
    })
    bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(req.body.password, salt, function(err,hash){
            const user = {
                username: req.body.username,
                password: hash,
                role_id: req.body.role_id,
                pegawai_id: req.body.pegawai_id
            }
            
            models.User.create(user).then(result => {
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
            res.status(400).json({
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
    models.User.findAll().then(result =>{
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
}

function update(req, res){
    const id = req.params.id;
    models.User.update(req.body, {where: {id: id}}).then(result =>{
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
            data: result.stack,
        })
    })
}

module.exports = {
    signUp,
    login,
    destroy,
    index,
    update
};