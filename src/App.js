import React, { Component } from 'react';
import './App.css';

import CurrencyValue from './components/CurrencyValue';
import CurrencyList from './components/CurrencyList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '1.00',
    };
  }

  onChangeValue(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <CurrencyValue
            value={this.state.value}
            handlerInput={(event) => this.onChangeValue(event)}/>
        </div>   
        <div className="content">
          <CurrencyList 
            value={this.state.value}/>
        </div>
      </div>
    );
  }
}

export default App;
