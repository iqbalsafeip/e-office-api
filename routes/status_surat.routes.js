const express = require('express');
const routes = express.Router()
const statusSuratController = require('../controllers/status_surat.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, statusSuratController.index);
routes.post('/',checkUserAuth, statusSuratController.save);
routes.patch('/:id',checkUserAuth, statusSuratController.update);
routes.delete('/:id',checkUserAuth, statusSuratController.destroy);

module.exports = routes;