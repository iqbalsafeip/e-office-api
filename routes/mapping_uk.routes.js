const express = require('express');
const routes = express.Router()
const mappingController = require('../controllers/mapping_uk.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, mappingController.index);
routes.get('/:id',checkUserAuth, mappingController.getById);
routes.post('/',checkUserAuth, mappingController.save);
routes.patch('/:id',checkUserAuth, mappingController.update);
routes.delete('/:id',checkUserAuth, mappingController.destroy);

module.exports = routes;