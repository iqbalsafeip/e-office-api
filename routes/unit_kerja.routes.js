const express = require('express');
const routes = express.Router()
const unitKerjaController = require('../controllers/unit_kerja.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, unitKerjaController.index);
routes.post('/',checkUserAuth, unitKerjaController.save);
routes.patch('/:id',checkUserAuth, unitKerjaController.update);
routes.delete('/:id',checkUserAuth, unitKerjaController.destroy);
routes.get('/:id',checkUserAuth, unitKerjaController.getById);
module.exports = routes;