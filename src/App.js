import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando ',
      nome: '',
      idade: '',
    };

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

    /*
    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });
    */
   firebase.database().ref('token').once('value').then((snapshot) => {
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

  render(){
    const {token, nome, idade} = this.state;
    return(
      <div>
        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
  }

}
