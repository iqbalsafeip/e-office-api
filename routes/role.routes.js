const express = require('express');
const routes = express.Router()
const roleController = require('../controllers/role.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, roleController.index);
routes.post('/',checkUserAuth, roleController.save);
routes.patch('/:id',checkUserAuth, roleController.update);
routes.delete('/:id',checkUserAuth, roleController.destroy);

module.exports = routes;