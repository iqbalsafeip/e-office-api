'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tbl_pegawai.init({
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    ttd_file: DataTypes.STRING,
    photo_file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_pegawai',
  });
  return tbl_pegawai;
};