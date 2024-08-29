const Login = require('../models/LoginModel');

exports.index = (req, res) => {
if(req.session.user) return res.render('Login-logado')
 res.render('Login');
};

exports.register = async function(req, res) {
  try{
    const login = new Login(req.body); // crio uma instancia da classe Login - que se encontra nos models do projeto - na variavel login
   await login.register(); // chamo o método register() da classe
    

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
      return res.redirect('/login/index');
      });
  } else {
     req.flash('success', 'seu usuario foi criado com successo');
     req.session.save(function() {
     return res.redirect('/login/index');
     });
  }

  } catch(e){
    console.log(e);
    res.render('404');
  }
   
};

exports.Login = async function(req, res) {
  try{
    const login = new Login(req.body); // crio uma instancia da classe Login - que se encontra nos models do projeto - na variavel login
   await login.Login(); // chamo o método register() da classe
    

    if (login.errors.length > 0) {
      console.log('porra')
      req.flash('errors', login.errors);
      req.session.save(function() {
      return res.redirect('/login/index');
      });
  } else {

     req.flash('success', 'você entrou no sistema');
     req.session.user = login.user;
     req.session.save(function() {
     return res.redirect('/login/index');
     });
  }
    

  } catch(e){
    console.log(e);
    res.render('404');
  }
};

 exports.logout = function(req,res){
   req.session.destroy(); 
   res.redirect('/');
 }