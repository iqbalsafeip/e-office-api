const models = require('../models');
const fs = require('fs');

const checkUsername = (username) => {
    models.User.findOne({where: {'username': username}}).then(result=> {
        return result;
    })
}

const getPegawaiById = (id) => {
    models.tbl_pegawai.findOne({where: {'id': id}}).then(result=> {
        return result;
    })
}

function deleteFiles(files, callback){
    var i = files.length;
    files.forEach(function(filepath){
      fs.unlink(filepath, function(err) {
        i--;
        if (err) {
          callback(err);
          return;
        } else if (i <= 0) {
          callback(null);
        }
      });
    });
  }

module.exports = {
    checkUsername,
    getPegawaiById,
    deleteFiles
}