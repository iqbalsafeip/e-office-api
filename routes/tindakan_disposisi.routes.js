const express = require('express');
const routes = express.Router()
const tindakanDisposisiController = require('../controllers/tindakan_disposisi.controller');

const checkUserAuth = require('../middleware/checkUserAuth');

routes.get('/',checkUserAuth, tindakanDisposisiController.index);
routes.post('/',checkUserAuth, tindakanDisposisiController.save);
routes.patch('/:id',checkUserAuth, tindakanDisposisiController.update);
routes.delete('/:id',checkUserAuth, tindakanDisposisiController.destroy);

module.exports = routes;