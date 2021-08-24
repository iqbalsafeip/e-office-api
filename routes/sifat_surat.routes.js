const express = require('express');
const routes = express.Router()
const sifatSuratController = require('../controllers/sifat_surat.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, sifatSuratController.index);
routes.post('/',checkUserAuth, sifatSuratController.save);
routes.patch('/:id',checkUserAuth, sifatSuratController.update);
routes.delete('/:id',checkUserAuth, sifatSuratController.destroy);

module.exports = routes;