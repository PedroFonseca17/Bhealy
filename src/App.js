import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home'
import FichaPessoal from './components/FichaPessoal';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/fichapessoal" component={FichaPessoal} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
