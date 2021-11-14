const express = require('express');
const routes = express.Router()
const pegawaiController = require('../controllers/pegawai.controller');

const checkUserAuth = require('../middleware/checkUserAuth');
const upload = require('../middleware/multer');
const onlyAdmin = require('../middleware/onlyAdmin');

routes.get('/',checkUserAuth, onlyAdmin, pegawaiController.index);
routes.get('/data',checkUserAuth, pegawaiController.getById);
routes.get('/:id',checkUserAuth, onlyAdmin, pegawaiController.getById);
routes.post('/',checkUserAuth, onlyAdmin, upload.upload.fields([{name: 'ttd_file', maxCount: 10}, {name: 'photo_file', maxCount: 10}]), pegawaiController.save);
routes.patch('/:id',checkUserAuth, onlyAdmin, upload.upload.fields([{name: 'ttd_file', maxCount: 10}, {name: 'photo_file', maxCount: 10}]), pegawaiController.update);
routes.delete('/:id',checkUserAuth, onlyAdmin, pegawaiController.destroy);

module.exports = routes;