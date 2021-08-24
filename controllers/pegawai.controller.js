const models = require('../models');
const { getPegawaiById, deleteFiles } = require('../utils');
const fs = require('fs');


function save(req,res) {
    console.log(req.files);
    if(req.files){
        const data = {
            'nip': req.body.nip,
            'nama' : req.body.nama,
            'jenis_kelamin' : req.body.jenis_kelamin,
            'tempat_lahir' : req.body.tempat_lahir,
            'tgl_lahir' : req.body.tgl_lahir,
            'no_telp' : req.body.no_telp,
            'email' : req.body.email,
            'alamat' : req.body.alamat,
            'ttd_file' : req.files.ttd_file[0].filename,
            'photo_file' : req.files.photo_file[0].filename
        }
        models.tbl_pegawai.create(data).then(result =>{
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
    } else {
        res.json({
            message: 'photo not selected'
        })
    }
}

function index(req,res){
    models.tbl_pegawai.findAll().then(result =>{
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
        'nip': req.body.nip,
        'nama' : req.body.nama,
        'jenis_kelamin' : req.body.jenis_kelamin,
        'tempat_lahir' : req.body.tempat_lahir,
        'tgl_lahir' : req.body.tgl_lahir,
        'no_telp' : req.body.no_telp,
        'email' : req.body.email,
        'alamat' : req.body.alamat
    }

    
    models.tbl_pegawai.findOne({where : {id: id}}).then(pegawai => {
        if(pegawai){
            if(req.files.ttd_file){
                data.ttd_file = req.files.ttd_file[0].filename
                deleteFiles(['uploads/ttd_file/' + pegawai.ttd_file], ()=>{})
            }
        
            if(req.files.photo_file){
                data.photo_file = req.files.photo_file[0].filename
                deleteFiles(['uploads/photo_file/' + pegawai.photo_file], ()=>{})
            }
            pegawai.update(data).then(result =>{
                res.status(200).json({
                    message : "Success to update",
                    data: data
                })
            }).catch(result =>{
                res.status(500).json({
                    message : "failed to update",
                    data: result.stack,
                })
            })
        } else {
            res.status(404).json({
                message : "Data Not Found",
            })
        }
    })
}

async function destroy(req, res){
    const id = req.params.id;
    models.tbl_pegawai.findOne({where: {id: id}}).then(result => {
        if(result){
            result.destroy().then(()=> {
                deleteFiles(['uploads/ttd_file/' + result.ttd_file, 'uploads/photo_file/' + result.photo_file], function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.status(200).json({
                            message : "Success to delete",
                        })
                    }
                })
            })
        }  else {
            res.status(404).json({
                message : "Data Not Found",
            })
        }
    })
}


module.exports = {
    save,
    update,
    index,
    destroy
};