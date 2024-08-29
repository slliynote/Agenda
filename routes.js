const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/LoginController');
const contatoController = require('./src/controllers/contatoController');

const {loginRequire} = require('./src/middlewares/middleware');



// Rotas da home
route.get('/', homeController.index);

// rotas login
route.get('/Login/index', loginController.index);
route.post('/Login/register', loginController.register);
route.post('/Login/Login', loginController.Login);
route.get('/Login/logout', loginController.logout);

//rotas contatos

route.get('/contato/index', loginRequire, contatoController.index)
route.post('/contato/register', contatoController.register)
route.get('/contato/index/:id', loginRequire, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequire, contatoController.edit)
route.get('/contato/delete/:id', loginRequire, contatoController.delete)

module.exports = route;
