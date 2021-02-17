import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      lista : [],
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

    firebase.database().ref('usuarios').on('value', (snapshot) => {
      let state = this.state;
      state.lista = [];

      snapshot.forEach((childItem) =>{
        state.lista.push({
          key: childItem.key,
          nome: childItem.val().nome,
          idade: childItem.val().idade,
        });
      });

      this.setState(state);
    });    
    
  }

  render(){
    const {nome, idade} = this.state;
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

        <div>
          {this.state.lista.map((item) => {
            return(
              <div>
                <h3>{item.key}</h3>
                <h1>Olá {item.nome}</h1>
                <h2>Idade {item.idade} anos</h2>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

}
