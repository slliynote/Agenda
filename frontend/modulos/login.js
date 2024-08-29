import validator from 'validator';

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

   init(){
    this.event();

   }

   event(){
    if(!this.form) return;
    this.form.addEventListener('submit', e => {
     e.preventDefault();
     this.valida(e);
    });
   }

   valida(e){
    const el = e.target ;
    const emailInput = el.querySelector('input[name="email"')
    const passwordinput = el.querySelector('input[name="password"')
    let error = false;

    if(!validator.isEmail(emailInput.value)){
     alert('E-mail invalido');
     error = true;
    }

    if(!passwordinput.value.lenght < 3 || passwordinput.value.lenght > 50){
        alert('senha preciso ter no minimo 3 e no maximo 50');
        error = true;
    }

    if(!error) el.submit();

   }

};

