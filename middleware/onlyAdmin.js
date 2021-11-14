const jwt = require('jsonwebtoken');
const models = require('../models');


function onlyAdmin(req ,res ,next){
    console.log(req.userData);

        models.User_role.findOne({where : {role_name : 'admin'}}).then((result)=> {
            if(result){
                if(result.id === req.userData.role_detail.id){
                    next();
                } else {
                    return res.status(401).json({
                        message: 'hanya role tertentu yang dapat mengakses',
                    })
                }
            } else {
                return res.status(401).json({
                    message: 'no role'
                })
            }
        })
}

module.exports = onlyAdmin