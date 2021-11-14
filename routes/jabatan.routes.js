const express = require('express');
const routes = express.Router()
const jabatanController = require('../controllers/jabatan.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, jabatanController.index);
routes.post('/',checkUserAuth, jabatanController.save);
routes.patch('/:id',checkUserAuth, jabatanController.update);
routes.delete('/:id',checkUserAuth, jabatanController.destroy);

module.exports = routes;