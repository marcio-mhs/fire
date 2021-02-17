import React, {Component} from 'react';
import firebase from './fireConnection';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: ''
    };

    this.logar = this.logar.bind(this);

    this.sair = this.sair.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        alert('Constructor: Usuário logado com sucesso! ' + user.email);
      }
    })
    
  }

  logar(e){
   
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) =>{
      if (error.code == 'auth/wrong-password'){
        alert('Erro: Senha incorreta');
      } else {
        alert('Códido do erro: ' + error.code);
      }
    });

    e.preventDefault();

  }

  sair(){
    firebase.auth().signOut();
    alert('Deslogado com sucesso!');
  }

  render(){
    return(
      <div>
        <h1>Entrar</h1>
        <form onSubmit={this.logar}>
          <div>
            <label>E-mail</label><br/>
            <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
            <br/>
            <label>Senha</label><br/>
            <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} />
            <br/>
            <button type="submit">Entrar</button>
          </div> 
          <br/> 
          <button onClick={this.sair}>Sair</button>
        </form>
      </div>
    );
  }

}
