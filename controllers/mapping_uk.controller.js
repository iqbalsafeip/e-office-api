const models = require('../models');

function save(req,res) {
    models.tbl_mapping_uk.create(req.body).then(result =>{
        res.status(200).json({
            message : "Success to insert data",
            data: result
        })
    }).catch(result =>{
        res.status(500).json({
            message : "failed to insert",
            data: result
        })
    })
}

function getById(req,res){
    const id = req.params.id;
    let whr = {id_unit_kerja: id}
    if(req.query.pegawai){
        whr = {id : id}
    }
    models.tbl_mapping_uk.findAll({where: whr, include : [models.tbl_jabatan, models.tbl_unit_kerja]}).then(result =>{
        if(!result){
            res.status(404).json({
                message: "Data Not Found"
            })
        } else {
            console.log(whr);
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

function index(req,res){
    models.tbl_mapping_uk.findAll({include : [models.tbl_jabatan, models.tbl_unit_kerja]}).then(result =>{
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
    models.tbl_mapping_uk.update(req.body, {where: {id: id},include : [models.tbl_jabatan, models.tbl_unit_kerja]}).then(result =>{
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
        console.log(result.stack);
        res.status(500).json({
            message : "failed to update",
        })
    })
}

function destroy(req, res){
    const id = req.params.id;
    models.tbl_mapping_uk.destroy({where: {id: id}}).then(result =>{
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
    destroy,
    getById
};