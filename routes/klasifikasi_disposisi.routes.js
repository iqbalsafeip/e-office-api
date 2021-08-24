const express = require('express');
const routes = express.Router()
const klasifikasiDisposisiController = require('../controllers/klasifikasi_disposisi.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, klasifikasiDisposisiController.index);
routes.post('/',checkUserAuth, klasifikasiDisposisiController.save);
routes.patch('/:id',checkUserAuth, klasifikasiDisposisiController.update);
routes.delete('/:id',checkUserAuth, klasifikasiDisposisiController.destroy);

module.exports = routes;