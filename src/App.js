import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      tokenInput: '',
      token: 'Carregando ',
      nomeInput: '',
      nome: '',
      idadeInput: '',
      idade: '',
    };

    this.cadastrar = this.cadastrar.bind(this);

    let firebaseConfig = {
      apiKey: "AIzaSyB_nBUnQ0vj91hbB71VmeBpI5PPm7U5Iu0",
      authDomain: "reactapp-bb79f.firebaseapp.com",
      projectId: "reactapp-bb79f",
      storageBucket: "reactapp-bb79f.appspot.com",
      messagingSenderId: "578201414826",
      appId: "1:578201414826:web:e3b85dc3ecc0c663d8b4d3"
    };

    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });    

    firebase.database().ref('usuarios').child(1).on('value', (snapshot) => {
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });
    
  }

  cadastrar(e){
    //firebase.database().ref('token').set(this.state.tokenInput);
    //firebase.database().ref('usuarios').child(1).child('idade').set(this.state.tokenInput);
    //firebase.database().ref('usuarios').child(1).child('cargo').set(this.state.tokenInput);
    //firebase.database().ref('usuarios').child(1).child('cargo').remove();

    let usuarios = firebase.database().ref('usuarios');
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idadeInput,
    });
    e.preventDefault();
  }

  render(){
    const {token, nome, idade} = this.state;
    return(
      <div>

        <form  onSubmit={this.cadastrar}>
          <div>
            <input type="text" value={this.state.nomeInput} onChange={(e) => this.setState({nomeInput: e.target.value})} />
            <br/>
            <input type="text" value={this.state.idadeInput} onChange={(e) => this.setState({idadeInput: e.target.value})} />
            <br/>
            <button type="submit">Cadastrar</button>
          </div>  
        </form>        

        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>

      </div>
    );
  }

}
