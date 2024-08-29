const mongoose = require('mongoose');
const validator = require('validator');
const bcript = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String ,required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
   constructor(body){
     this.body = body;
     this.errors = [];
     this.user = null;
   }

  async Login(){
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email});

    if(!this.user ){
      this.errors.push('usuario não existe');
      return;
    }

    if(!bcript.compareSync(this.body.password, this.user.password)){
    this.errors.push('senha inválida');
    this.user = null;
    return;
    }
  }

   async register(){
    this.valida();
    if(this.errors.length > 0) return;
  
    
    await this.userExiste();

    if(this.errors.length > 0) return;
     
    const salt = bcript.genSaltSync();
    this.body.password = bcript.hashSync(this.body.password, salt);

   
      
      this.user = await LoginModel.create(this.body);
   }

     async userExiste(){
      this.user = await LoginModel.findOne({ email: this.body.email})
      if(this.user) this.errors.push('usuario Já existe')

    };

   valida() {
    this.cleanUp()
    


    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido'),console.log('emailinvalide');


    if(this.body.password.length < 3 || this.body.password.length > 50){
      this.errors.push('A senha precisa ter 3 ou até 50 caracteres');
      console.log('a senha precisa ter 3 ...');
    }

   

   }

   cleanUp(){
     for( const key in this.body){
     if(typeof this.body[key] !== 'string'){
         this.body[key] = '';
    }
   }
    this.body = {
       email: this.body.email,
       password: this.body.password
    };
  }
 }
module.exports = Login;
