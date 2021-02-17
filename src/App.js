import React, {Component} from 'react';
import firebase from './fireConnection';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };

    this.cadastrar = this.cadastrar.bind(this);

    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        firebase.database().ref('usuarios').child(user.uid).set({
          nome: this.state.nome
        })
        .then(() => {
          this.setState({nome: '', email: '', senha: ''});
        });
      }
    })
    
  }

  cadastrar(e){
   
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) =>{
        alert('Códido do erro: ' + error.code);
    });

    e.preventDefault();

  }

  render(){
    return(
      <div>
        <h1>Novo Usuário</h1>
        <form onSubmit={(e) => {this.cadastrar(e)}}>
          <div>
            <label>Nome</label><br/>
            <input type="text" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})} />
            <br/>
            <label>E-mail</label><br/>
            <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
            <br/>
            <label>Senha</label><br/>
            <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} />
            <br/><br/>
            <button type="submit">Cadastrar</button>
          </div> 
        </form>
      </div>
    );
  }

}
