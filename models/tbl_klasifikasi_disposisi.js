'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_klasifikasi_disposisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tbl_klasifikasi_disposisi.init({
    klasifikasi: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_klasifikasi_disposisi',
  });
  return tbl_klasifikasi_disposisi;
};