const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkUsername} = require('../utils');


function signUp(req,res) {
    models.User.findOne({where: {username: req.body.username}}).then(result => {
        if(result){
            return res.status(409).json({
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
                name: req.body.name
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

function login (req,res){
    models.User.findOne({where: {username: req.body.username}}).then(result => {
        if(result){
            bcryptjs.compare(req.body.password, result.password, function(err, resultPwd){
                if(resultPwd){
                    const token = jwt.sign({
                        username: result.username,
                        role_id: result.role_id,
                        name: result.name
                    }, 'eoffice', function(err,token){
                        res.status(200).json({
                            token: token,
                            message: 'login successful',
                            username: result.username,
                            role_id: result.role_id,
                            name: result.name
                        })
                    })
                } else {
                    res.status(401).json({
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
        res.status(404).json({
            message: 'something went wrong',
            error : err
        })
    })
}

module.exports = {
    signUp,
    login
};