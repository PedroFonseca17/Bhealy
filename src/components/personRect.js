import React, { Component } from 'react';
import '../App.css';
import pessoaAmarela from '../images/pessoaAmarela.png';
import pessoaVerde from '../images/pessoaVerde.png';
import pessoaVermelha from '../images/pessoaVermelha.png';
import bpm from '../images/bpm.png';
import esteto from '../images/esteto.png'
import s2o2 from '../images/s2o2.png'



class PersonRect extends Component{
    constructor(props){
        super(props);
        this.state = {
            hearRate: 0,
            overall: 5,
            heartColor: null,
            pressureColor: null,
            spo2Color: null,
            pessoa: pessoaAmarela,
            loaded: false,
        }
    }

    async componentWillMount(){
        await this.setHeartColor();
        await this.setPressureColor();
        await this.setSpo2Color();
        await this.setPessoaColor();
     }
    //Sets the heart color
    setHeartColor = () => {
        var heartRate = this.props.heartRate;

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

    //Sets the Pressure color
    setPressureColor = () => {
        var pressure = this.props.pressure;
        if( (pressure < 160 &&  pressure > 120)){
            this.setState({
                pressureColor: 'Amarelo'
            })
        }
        else if(pressure < 120){
            this.setState({
                pressureColor: 'Verde'
            })
        }
        else{
            this.setState({
                pressureColor: 'Vermelho'
            })
        }
    }

    //Sets the Spo2 color
    setSpo2Color = () => {
        var spo2= this.props.spo2;

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
    }

    setPessoaColor = () => {
        var nVermelhos = 0
        var nAmarelos = 0

        if(this.state.heartColor === 'Vermelho') nVermelhos++;
        if(this.state.pressureColor === 'Vermelho') nVermelhos++;
        if(this.state.spo2Color === 'Vermelho') nVermelhos++;
        

        if(this.state.heartColor === 'Amarelo') nAmarelos++;
        if(this.state.pressureColor === 'Amarelo') nAmarelos++;
        if(this.state.spo2Color === 'Amarelo') nAmarelos++;
      
        if(nVermelhos > 0 ){
            this.setState({
                pessoa: pessoaVermelha,
                loaded: true,
            }) 
        }else if(nAmarelos > 1){
            this.setState({
                pessoa: pessoaAmarela,
                loaded: true,
            }) 
        }
        
        else {
            this.setState({
                pessoa: pessoaVerde,
                loaded: true,
            })
        }
    }
        
    

    render() {
        if (!this.state.loaded) return <p>Loading...</p>;

        return (
        <div>
          <div className="personReactContainer">
                <img src={this.state.pessoa} alt="Logo" style={{marginTop: '15px', width:'60%'}}/>       
                <div className="quadradosContainer">
                    <div className={"quadradoHeart" + this.state.heartColor}> <img src={bpm} alt="Logo" className={"imagesSensor"} /> </div>
                    <div className={"quadradoSpo2" + this.state.spo2Color}><img src={s2o2} alt="Logo" className={"imagesSensor"} /> </div>
                    <div className={"quadradoPressure" + this.state.pressureColor}><img src={esteto} alt="Logo" className={"imagesSensor"}/> </div>
                </div> 
          </div>
          </div>
        );
      }
}

export default PersonRect;
