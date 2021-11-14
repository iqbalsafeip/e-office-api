const express = require('express');
const routes = express.Router()
const suratController = require('../controllers/surat.controller');

const checkUserAuth = require('../middleware/checkUserAuth');
const upload = require('../middleware/multer');

routes.get('/penerima',checkUserAuth, suratController.penerima);
routes.get('/penerima/:id',checkUserAuth, suratController.getPenerimaDetails);
routes.post('/',checkUserAuth, upload.upload.single('file_surat'), suratController.save);
routes.get('/',checkUserAuth, suratController.index);
routes.delete('/:id',checkUserAuth, suratController.destroy);
routes.get('/:id',checkUserAuth, suratController.getById);

module.exports = routes;