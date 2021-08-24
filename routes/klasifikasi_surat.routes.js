const express = require('express');
const routes = express.Router()
const klasifikasiSuratController = require('../controllers/klasifikasi_surat.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, klasifikasiSuratController.index);
routes.post('/',checkUserAuth, klasifikasiSuratController.save);
routes.patch('/:id',checkUserAuth, klasifikasiSuratController.update);
routes.delete('/:id',checkUserAuth, klasifikasiSuratController.destroy);

module.exports = routes;