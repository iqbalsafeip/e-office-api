'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_jabatan, {foreignKey: {
        name: 'parent_id'
      }, as: 'parent'})

    }
  };
  tbl_jabatan.init({
    parent_id: DataTypes.INTEGER,
    jabatan: DataTypes.STRING,
    fungsi: DataTypes.INTEGER,
    keterangan: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_jabatan',
  });
  return tbl_jabatan;
};