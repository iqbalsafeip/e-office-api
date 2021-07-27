const models = require('../models');

function save(req,res) {
    const role = {
        'role_name': req.body.role_name
    }
    models.User_role.create(role).then(result =>{
        res.status(200).json({
            message : "Success to insert role",
            data: result
        })
    }).catch(result =>{
        res.status(500).json({
            message : "failed to insert",
            data: result
        })
    })
}

function index(req,res){
    models.User_role.findAll().then(result =>{
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
    const role = {
        'role_name': req.body.role_name
    }
    models.User_role.update(role, {where: {id: id}}).then(result =>{
        if(result === null){
            res.status(404).json({
                message : "Data Not Found",
            })
        } else {
            res.status(200).json({
                message : "Success to update",
                data: role
            })
        }
    }).catch(result =>{
        res.status(500).json({
            message : "failed to update",
            data: result
        })
    })
}

function destroy(req, res){
    const id = req.params.id;
    const role = {
        'role_name': req.body.role_name
    }
    models.User_role.destroy({where: {id: id}}).then(result =>{
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


module.exports = {
    save,
    update,
    index,
    destroy
};