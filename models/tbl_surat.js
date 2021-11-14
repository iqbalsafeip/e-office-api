'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_surat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_status_surat, {
        foreignKey: 'status_surat_id'
      })
      this.belongsTo(models.tbl_kategori_surat, {
        foreignKey: 'kategori_surat_id'
      })
      this.belongsTo(models.tbl_klasifikasi_surat, {
        foreignKey: 'klasifikasi_surat_id'
      })
      this.belongsTo(models.tbl_sifat_surat, {
        foreignKey: 'sifat_surat_id'
      })
    }
  };
  tbl_surat.init({
    kategori_surat_id: DataTypes.INTEGER,
    klasifikasi_surat_id: DataTypes.INTEGER,
    sifat_surat_id: DataTypes.INTEGER,
    status_surat_id: DataTypes.INTEGER,
    tipe: DataTypes.INTEGER,
    jenis_surat: DataTypes.INTEGER,
    no_agenda: DataTypes.STRING,
    no_surat: DataTypes.STRING,
    tgl_surat: DataTypes.STRING,
    tgl_terima: DataTypes.STRING,
    perihal: DataTypes.STRING,
    kepada: DataTypes.STRING,
    dari: DataTypes.STRING,
    isi_surat: DataTypes.TEXT,
    file_surat: DataTypes.STRING,
    atas_nama: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_surat',
  });
  return tbl_surat;
};