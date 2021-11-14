'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_mapping_uk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_jabatan, {
        foreignKey: 'id_jabatan'
      })

      this.belongsTo(models.tbl_unit_kerja, {
        foreignKey: 'id_unit_kerja'
      })
    }
  };
  tbl_mapping_uk.init({
    id_unit_kerja: DataTypes.INTEGER,
    id_jabatan: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_mapping_uk',
  });
  return tbl_mapping_uk;
};