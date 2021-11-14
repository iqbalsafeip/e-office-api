const express = require('express');
const routes = express.Router()
const instansiController = require('../controllers/instansi.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, instansiController.index);
routes.get('/:id',checkUserAuth, instansiController.getById);
routes.post('/',checkUserAuth, instansiController.save);
routes.patch('/:id',checkUserAuth, instansiController.update);
routes.delete('/:id',checkUserAuth, instansiController.destroy);

module.exports = routes;