const models = require('../models');

function save(req, res) {
	if (req.file) {
		const data = {
			...req.body,
			file_surat: req.file.filename
		};
		models.tbl_surat
			.create(data)
			.then(async (result) => {
				const penerima = JSON.parse(req.body.penerima);
				await penerima.map((_data) => {
					models.tbl_surat_penerima.create({
						surat_id: result.id,
						id_unit_kerja: _data.penerima.id_unit_kerja,
						id_jabatan: _data.penerima.id_jabatan,
						..._data
					});
					console.log(_data);
				});
				await res.status(200).json({
					message: 'Success to insert data',
					data: result
				});
			})
			.catch((result) => {
				res.status(500).json({
					message: 'failed to insert',
					data: result
				});
			});
	} else {
		res.status(404).json({
			message: 'photo not selected'
		});
	}
}

function index(req, res) {
	let options = {};
	if (req.query.tipe) {
		options = {
			where: {
				tipe: req.query.tipe
			}
		};
	}
	models.tbl_surat
		.findAll({
			...options,
			include: [
				models.tbl_status_surat,
				models.tbl_kategori_surat,
				models.tbl_klasifikasi_surat,
				models.tbl_sifat_surat
			]
		})
		.then((result) => {
			if (result.length === 0) {
				res.status(404).json({
					message: 'Data Not Found'
				});
			} else {
				res.status(200).json({
					data: result
				});
			}
		})
		.catch((result) => {
			res.status(500).json({
				message: 'failed to get',
				data: result.stack
			});
		});
}

function destroy(req, res) {
	const id = req.params.id;
	models.tbl_surat
		.destroy({ where: { id: id } })
		.then((result) => {
			if (result) {
				res.status(200).json({
					message: 'Success to delete'
				});
			} else {
				res.status(404).json({
					message: 'Data Not Found'
				});
			}
		})
		.catch((result) => {
			res.status(500).json({
				message: 'failed to delete',
				data: result
			});
		});
}

function getById(req, res) {
	let id = req.params.id;
	models.tbl_surat
		.findOne({
			where: { id: id },
			include: [
				models.tbl_status_surat,
				models.tbl_kategori_surat,
				models.tbl_klasifikasi_surat,
				models.tbl_sifat_surat
			]
		})
		.then((result) => {
			if (!result) {
				res.status(404).json({
					message: 'Data Not Found'
				});
			} else {
				res.status(200).json({
					data: result
				});
			}
		})
		.catch((result) => {
			res.status(500).json({
				message: 'failed to get',
				data: result
			});
		});
}

function penerima(req, res) {
	const surat_id = req.query.suratId;
	console.log(surat_id);
	models.tbl_surat_penerima
		.findAll({ where: { surat_id: surat_id }, include: [ models.tbl_unit_kerja, models.tbl_jabatan ] })
		.then((result) => {
			if (result.length === 0) {
				res.status(404).json({
					message: 'Data Not Found'
				});
			} else {
				res.status(200).json({
					data: result
				});
			}
		})
		.catch((result) => {
			res.status(500).json({
				message: 'failed to get',
				data: result.stack
			});
		});
}

function getPenerimaDetails(req, res) {
	const id = req.params.id;
	models.tbl_mapping_uk
		.findOne({ where: { id: id }, include: [ models.tbl_jabatan, models.tbl_unit_kerja ] })
		.then((result) => {
			if (!result) {
				res.status(404).json({
					message: 'Data Not Found'
				});
			} else {
				res.status(200).json({
					data: result
				});
			}
		})
		.catch((result) => {
			res.status(500).json({
				message: 'failed to get',
				data: result.stack
			});
		});
}

module.exports = {
	save,
	index,
	destroy,
	getById,
	penerima,
	getPenerimaDetails
};
