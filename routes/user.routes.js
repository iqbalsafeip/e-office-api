const express = require('express');
const routes = express.Router()
const userController = require('../controllers/user.controller');
const checkUserAuth = require('../middleware/checkUserAuth');
const onlyAdmin = require('../middleware/onlyAdmin');

routes.post('/signup', userController.signUp);
routes.post('/login', userController.login);
routes.get('/', checkUserAuth, userController.index);
routes.delete('/:id', checkUserAuth, userController.destroy);
routes.patch('/:id',checkUserAuth, userController.update);

module.exports = routes;