'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_unit_kerja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbl_mapping_uk, {
        as: 'jabatan',
        foreignKey: 'id_unit_kerja'
      })
    }
  };
  tbl_unit_kerja.init({
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_unit_kerja',
  });
  return tbl_unit_kerja;
};