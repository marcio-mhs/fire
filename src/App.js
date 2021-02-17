import React, {Component} from 'react';
import firebase from './fireConnection';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: ''
    };

    this.cadastrar = this.cadastrar.bind(this);
    
  }

  cadastrar(e){
   
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) =>{
      if (error.code == 'auth/invalid-email'){
        alert('E-mail inválido');
      } else if (error.code =='auth/weak-password'){
        alert('Senha fraca');
      } else {
        alert('Códido do erro: ' + error.code);
      }
    });

    e.preventDefautl();

  }

  render(){
    return(
      <div>
        <form onSubmit={this.cadastrar}>
          <div>
            <label>E-mail</label><br/>
            <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
            <br/>
            <label>Senha</label><br/>
            <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} />
            <br/>
            <button type="submit">Cadastrar</button>
          </div>  
        </form>
      </div>
    );
  }

}
