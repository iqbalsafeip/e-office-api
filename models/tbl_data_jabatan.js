'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_data_jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tbl_data_jabatan.init({
    id_pegawai: DataTypes.INTEGER,
    id_unit_kerja_jabatan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_data_jabatan',
  });
  return tbl_data_jabatan;
};