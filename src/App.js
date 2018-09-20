import React, { Component } from 'react';
import './App.css';

import CurrencyValue from './components/CurrencyValue';
import CurrencyList from './components/CurrencyList';
import AddCurrency from './components/AddCurrency';

const api = 'https://api.exchangeratesapi.io/latest?base=USD';
const api_currency_name = 'https://openexchangerates.org/api/currencies.json';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '1.00',
      rates : null,
      currencyList: null,
      currencyName : null,
      currencyShowed : ['IDR', 'EUR', 'GBP', 'SGD'],
      isAddCurrency: false,
      selectedCurrency: null
    };
  }

  componentDidMount() {
    // Get Exchange Rate Currency data from API
    fetch(api)
      .then(response => response.json())
      .then(data => this.setState({ 
        rates: data.rates,
        currencyList: Object.keys(data.rates).sort()
      }));
    
    // Get List of Currency Name data form API
    fetch(api_currency_name)
      .then(response => response.json())
      .then(data => this.setState({ currencyName: data }));
  }

  onChangeValue(event) {
    this.setState({
      value: event.target.value
    })
  }
  
  addMoreCurrency() {
    this.setState({
      isAddCurrency: true,
    })
  }

  onChangeSelectCurrency(event) {
    this.setState({
      selectedCurrency: event.target.value
    })
  }

  addNewShowedCurrency() {
    var temp = this.state.currencyShowed.slice();
    if (this.state.selectedCurrency != null) {    
      temp.push(this.state.selectedCurrency);
    }   
    this.setState({
      isAddCurrency: false,
      currencyShowed: temp,
      selectedCurrency: null
    })
  }

  deleteAShowedCurrency(e) {
    var array = this.state.currencyShowed.slice();
    var index = array.indexOf(e.target.value);
    if (index !== -1) array.splice(index, 1);
    this.setState({
      currencyShowed: array
    })
  }

  render() {
    var isAPIReady = (this.state.rates != null && this.state.currencyName != null)

    return (
      <div className="App">
        <div className="header">
          <CurrencyValue
            value={this.state.value}
            handlerInput={(event) => this.onChangeValue(event)}/>
        </div>   
        { isAPIReady ?
        <div className="content">
            <CurrencyList 
              list={this.state.currencyShowed} 
              rates={this.state.rates}
              value={this.state.value}
              namelist={this.state.currencyName}
              handler={this.deleteAShowedCurrency.bind(this)}/>
            <AddCurrency 
              status={this.state.isAddCurrency}
              currencyList={this.state.currencyList} 
              currencyShowed={this.state.currencyShowed} 
              handlerChange={(event) => this.onChangeSelectCurrency(event)}
              handlerSubmit={() => this.addNewShowedCurrency()}
              handlerStatus={()=> this.addMoreCurrency()}/>
        </div>
        : null
        }
      </div>
    );
  }
}

export default App;
