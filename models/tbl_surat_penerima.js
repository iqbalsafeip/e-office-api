'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class tbl_surat_penerima extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			this.belongsTo(models.tbl_unit_kerja, {
				foreignKey: 'id_unit_kerja'
			});
			this.belongsTo(models.tbl_jabatan, {
				foreignKey: 'id_jabatan'
			});
		}
	}
	tbl_surat_penerima.init(
		{
			surat_id: DataTypes.INTEGER,
			id_unit_kerja_jabatan: DataTypes.INTEGER,
			id_unit_kerja: DataTypes.INTEGER,
			id_jabatan: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'tbl_surat_penerima'
		}
	);
	return tbl_surat_penerima;
};
