const Login = require('../models/LoginModel');

exports.index = (req, res) => {
 res.render('Login');
};

exports.register = async function(req, res) {
    const login = new Login(req.body); // crio uma instancia da classe Login - que se encontra nos models do projeto - na variavel login
    await login.register(); // chamo o método register() da classe

    if(login.errors.length > 0) { // se a array errors da classe tiver algo:
      req.flash('errors', login.errors); // manda um flash como sendo um array com os errors
    }
    res.send(login.errors);
}