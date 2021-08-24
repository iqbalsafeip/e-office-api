const models = require('../models');

function save(req,res) {
    const data = {
        'klasifikasi': req.body.klasifikasi,
        'keterangan' : req.body.keterangan,
        'is_active' : req.body.is_active
    }
    models.tbl_klasifikasi_disposisi.create(data).then(result =>{
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
    models.tbl_klasifikasi_disposisi.findAll().then(result =>{
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
        'klasifikasi': req.body.klasifikasi,
        'keterangan' : req.body.keterangan,
        'is_active' : req.body.is_active
    }
    models.tbl_klasifikasi_disposisi.update(data, {where: {id: id}}).then(result =>{
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
        })
    })
}

function destroy(req, res){
    const id = req.params.id;
    models.tbl_klasifikasi_disposisi.destroy({where: {id: id}}).then(result =>{
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