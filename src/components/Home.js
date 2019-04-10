import React, { Component } from 'react';
import '../App.css';
import PersonRect from './personRect'
import {NavLink} from 'react-router-dom'
import firebase from './Firebase';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersStruct: [],
      loaded: false,
    }
  }

  componentWillMount(){
    const db = firebase.firestore();
    let newArray = []
    db.collection("users").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var obj = doc.data();
            Object.assign(obj, {id: doc.id});
            newArray.push(obj);
        });
    }).then(() => {
      this.setState({
        usersStruct: newArray
      })
    }).then(() => {
      this.setState({
        loaded: true,
      })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  componentDidMount(){
    this.searchForIt();
  }



  searchForIt = () =>{
    console.log('entrei mount');
    const db = firebase.firestore();
    db.collection("users")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
              this.setState({
                loaded: false,
              });
               var newArray  = this.state.usersStruct;
                console.log("Modified city: ", change.doc.data());
                for (var i in newArray) {
                  console.log("loop");
                  if (newArray[i].id === change.doc.id) {
                    console.log("encontrei");
                    var obj = change.doc.data();
                    Object.assign(obj, {id: change.doc.id});
                    newArray[i] = obj;
                    this.setState({
                      usersStruct: newArray,
                      loaded:true,
                    })
                    console.log(this.state.usersStruct)
                   break;
                     
                  }
                }
              }
            }); 
    });
  }

  render() {
    if (!this.state.loaded) return <p>Loading...</p>;
    var items = this.state.usersStruct.map( (user,index) =>  <NavLink to={{pathname: "/fichapessoal", state:{idUser: user}}}><PersonRect key={index} heartRate={user.heart} pressure={user.pressure} spo2={user.spo2} /> </NavLink>)
    return (
      <div className="App">
        <h1 className="tituloUrgencia">Pacientes</h1>
        <div className="pessoasContainer"> 
          {items}
        </div>
      </div>
    );
  }
}

export default Home;
