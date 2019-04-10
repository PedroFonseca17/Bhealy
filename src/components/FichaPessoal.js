import React, { Component } from 'react';
import '../App.css';

import s2o2 from '../images/SpO2Big.png'
import heartRate from '../images/heartRateBig.png'
import esteto from '../images/estetoBig.png'
import graph from '../images/graph.png'
import {NavLink} from 'react-router-dom'

class FichaPessoal extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: null,
      loaded: false,
      spo2Color: 'Verde',
      heartColor: 'Verde',
      pressureColor: 'verde'
    }
  }

  componentWillMount(){
    const {idUser} = this.props.location.state;
    this.setState({
      user: idUser,
      loaded: true,
    })

    var spo2= idUser.spo2;
    console.log(idUser)

    if( (spo2 < 90 &&  spo2 > 80) ){
        this.setState({
            spo2Color: 'Amarelo'
        })
    }
    else if(spo2 > 95 && spo2 < 100){
        this.setState({
            spo2Color: 'Verde'
        })
    }
    else{
        this.setState({
            spo2Color: 'Vermelho'
        })
    }

    var pressure = idUser.pressure;
    console.log(pressure)
    if( (pressure < 160 &&  pressure > 120)){
        this.setState({
            pressureColor: 'Amarelo'
        })
    }
    else if( pressure < 120){
        this.setState({
            pressureColor: 'Verde'
        })
    }
    else{
        this.setState({
            pressureColor: 'Vermelho'
        })
    }

    var heartRate = idUser.heart;
    console.log(heartRate)
    console.log(idUser.heart)

    if( (heartRate < 60 &&  heartRate > 30) || (heartRate > 101 && heartRate < 120)){
        this.setState({
            heartColor: 'Amarelo'
        })
    }
    else if(heartRate > 60 && heartRate < 100){
        this.setState({
            heartColor: 'Verde'
        })
    }
    else{
        this.setState({
            heartColor: 'Vermelho'
        })
    }

}
  

  render() {
    if (!this.state.loaded) return <p>Loading...</p>;
    return (
      <div className="App">
        <div className="afterHeader">
        <NavLink to={{pathname: "/"}} style={{ textDecoration: 'none' }}><p className="voltarText">&#8592;</p> </NavLink>
          <p className="pacienteText">Paciente</p>
          <p className="nomeUser">{this.state.user.name}</p>
          <p className="pulseira">Pulseira nº {parseInt(10000 + Math.random() * (99999 - 10000) )}</p>
          <div className="alarme"><p>ALARME</p></div>
        </div>
        <div className="infos">
          <div className="infosIcons">
            <img src={heartRate} alt="Logo" className="iconsFichaHeart" />
            <img src={s2o2} alt="Logo" className="iconsFichaS2o2" />
            <img src={esteto} alt="Logo" className="iconsFichaEsteto" />
          </div>
          <div className="infosContainers">
            <div className="heartContainer">
            <img src={graph} alt="Logo" className="graph" />
          </div>
            <div className="spo2Container">
              <p className="text">%SpO2</p>
              <h1 className={"value"+this.state.spo2Color}>{this.state.user.spo2}</h1>
              <p className="text">PRbpm</p>
              <h1 className={"value"+this.state.heartColor}>{this.state.user.heart}</h1>
            </div>
            <div className="pressionContainer">
              <p className="text">Pressão Sistólica</p>
              <h1 className={"value"+this.state.pressureColor}>{this.state.user.pressure}</h1>
              <p className="text">Pressão Diatólica</p>
              <h1 className={"value"+this.state.pressureColor}>82</h1>
            </div>
          </div>
         
        </div>
        <div className="localizacao">
              <p className="localizacaoText"><b>LOCALIZAÇÃO DO PACIENTE:</b> {this.state.user.address} </p>
              <div className="localizacaoButton"><p>MAPA</p></div>
            </div>
       
      </div>
    );
  }
}

export default FichaPessoal;
