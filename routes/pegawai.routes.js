const express = require('express');
const routes = express.Router()
const pegawaiController = require('../controllers/pegawai.controller');

const checkUserAuth = require('../middleware/checkUserAuth');
const upload = require('../middleware/multer');

routes.get('/',checkUserAuth, pegawaiController.index);
routes.post('/',checkUserAuth,upload.upload.fields([{name: 'ttd_file', maxCount: 10}, {name: 'photo_file', maxCount: 10}]), pegawaiController.save);
routes.patch('/:id',checkUserAuth, upload.upload.fields([{name: 'ttd_file', maxCount: 10}, {name: 'photo_file', maxCount: 10}]), pegawaiController.update);
routes.delete('/:id',checkUserAuth, pegawaiController.destroy);

module.exports = routes;