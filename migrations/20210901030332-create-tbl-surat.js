'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbl_surats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kategori_surat_id: {
        type: Sequelize.INTEGER
      },
      klasifikasi_surat_id: {
        type: Sequelize.INTEGER
      },
      sifat_surat_id: {
        type: Sequelize.INTEGER
      },
      status_surat_id: {
        type: Sequelize.INTEGER
      },
      tipe: {
        type: Sequelize.INTEGER
      },
      jenis_surat: {
        type: Sequelize.INTEGER
      },
      no_agenda: {
        type: Sequelize.STRING
      },
      no_surat: {
        type: Sequelize.STRING
      },
      tgl_surat: {
        type: Sequelize.STRING
      },
      tgl_terima: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.STRING
      },
      kepada: {
        type: Sequelize.STRING
      },
      dari: {
        type: Sequelize.STRING
      },
      isi_surat: {
        type: Sequelize.TEXT
      },
      file_surat: {
        type: Sequelize.STRING
      },
      atas_nama: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbl_surats');
  }
};