const express = require('express');
const routes = express.Router()
const kategoriSuratController = require('../controllers/kategori_surat.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, kategoriSuratController.index);
routes.post('/',checkUserAuth, kategoriSuratController.save);
routes.patch('/:id',checkUserAuth, kategoriSuratController.update);
routes.delete('/:id',checkUserAuth, kategoriSuratController.destroy);

module.exports = routes;