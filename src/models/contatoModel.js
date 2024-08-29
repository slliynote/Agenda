const mongoose = require('mongoose');
const validator = require('validator')

const contatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: ''},
  telefone: { type: String, required: false}, default: '',
  criado: { type: String, default: Date.now},
});

const contatoModel = mongoose.model('contato', contatoSchema);

function contato (body){
   this.body = body;
   this.errors = [] ;
   this.contato = null;
}

contato.prototype.register = async function() {
   this.valida();
   if(this.errors.length > 0) return;
   this.contato = await contatoModel.create(this.body);

}
contato.prototype.valida = function() {
this.cleanUp();

if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
if(!this.body.nome) this.errors.push('Nome é um campo obrigatorio.');
if(!this.body.email && !this.body.telefone){
   this.errors.push('pelo menos um contato precisa ser enviado com email ou telefone');
 }
};

contato.prototype.cleanUp = function(){
 for( const key in this.body){
 if(typeof this.body[key] !== 'string'){
     this.body[key] = '';
}
}
this.body = {
   nome: this.body.nome,
   sobrenome: this.body.sobrenome,
   email: this.body.email,
   telefone: this.body.telefone,
}
};

contato.prototype.edit = async function(id){
   if(typeof id !== 'string') return;
   this.valida();
   if(this.errors.length > 0) return;
   this.contato = await contatoModel.findByIdAndUpdate(id, this.body, { new: true });
};
//metodos estaticos 
contato.buscaPorId = async function(id) {
   if(typeof id !== 'string')return;
   const contato= await contatoModel.findById(id);
   return contato;
};

contato.buscaContatos = async function(){
   const contatos = await contatoModel.find()
   .sort({ criadoEm: -1 });
   return contatos;
};

contato.delete = async function({_id: id}){
   if(typeof id !== 'string')return;
   const contato = await contatoModel.findOneAndDelete(id);
   return contato;
};


module.exports = contato;
