const express = require('express');
const routes = express.Router()
const dataJabatan = require('../controllers/data_jabatan.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, dataJabatan.index);
routes.get('/:id',checkUserAuth, dataJabatan.getById);
routes.post('/',checkUserAuth, dataJabatan.save);
routes.patch('/:id',checkUserAuth, dataJabatan.update);
routes.delete('/:id',checkUserAuth, dataJabatan.destroy);

module.exports = routes;