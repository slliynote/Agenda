const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/LoginController');


// Rotas da home
route.get('/', homeController.index);

// rotas login
route.get('/Login/index', loginController.index);
route.post('/Login/register', loginController.register)



module.exports = route;
