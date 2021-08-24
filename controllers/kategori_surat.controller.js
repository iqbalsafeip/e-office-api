const models = require('../models');

function save(req,res) {
    const data = {
        'kategori': req.body.kategori,
        'keterangan' : req.body.keterangan,
        'is_active' : req.body.is_active
    }
    models.tbl_kategori_surat.create(data).then(result =>{
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

function index(req,res){
    models.tbl_kategori_surat.findAll().then(result =>{
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
    const data = {
        'kategori': req.body.kategori,
        'keterangan' : req.body.keterangan,
        'is_active' : req.body.is_active
    }
    models.tbl_kategori_surat.update(data, {where: {id: id}}).then(result =>{
        if(result === null){
            res.status(404).json({
                message : "Data Not Found",
            })
        } else {
            res.status(200).json({
                message : "Success to update",
                data: data
            })
        }
    }).catch(result =>{
        res.status(500).json({
            message : "failed to update",
            data: result.stack,
            awd: req.body
        })
    })
}

function destroy(req, res){
    const id = req.params.id;
    models.tbl_kategori_surat.destroy({where: {id: id}}).then(result =>{
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