const express = require('express');
const routes = express.Router()
const userController = require('../controllers/user.controller');

routes.post('/signup', userController.signUp);
routes.post('/login', userController.login);
routes.get('/', userController.index);
routes.delete('/:id', userController.destroy);
routes.patch('/:id', userController.update);

module.exports = routes;