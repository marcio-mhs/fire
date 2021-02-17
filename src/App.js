import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {};

    let firebaseConfig = {
      apiKey: "AIzaSyB_nBUnQ0vj91hbB71VmeBpI5PPm7U5Iu0",
      authDomain: "reactapp-bb79f.firebaseapp.com",
      projectId: "reactapp-bb79f",
      storageBucket: "reactapp-bb79f.appspot.com",
      messagingSenderId: "578201414826",
      appId: "1:578201414826:web:e3b85dc3ecc0c663d8b4d3"
    };

    if(!firebase.apps.length){
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
    
  }

  render(){
    return(
      <div>
        <h1>Funcionando!</h1>
      </div>
    );
  }

}
