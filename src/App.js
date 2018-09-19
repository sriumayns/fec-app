import React, { Component } from 'react';
import './App.css';

import ShowedCurrency from './components/ShowedCurrency';

const api = 'https://api.exchangeratesapi.io/latest?base=USD';
const api_currency_name = 'https://openexchangerates.org/api/currencies.json';

const addCurrency = {
  margin: '30px 0',
  textAlign: 'center'
}

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

  getListOfCurrency() {
    var currency;
    var list = this.state.currencyShowed.slice();
  
    if(this.state.rates != null) {
      currency = (
          <div className="form-group" style={{width:'75%', display: 'inline-block'}}>
            <select 
              className="form-control"  
              defaultValue=""
              onChange={(event) => this.onChangeSelectCurrency(event)}>
              <option value="" disabled>-- Choose Currency--</option> : null
              { this.state.currencyList.map((currency, i) => (
                list.indexOf(currency) === -1 ?
                <option value={currency} key={i}>{currency}</option> : null
              ))}
            </select>
          </div>
      );
    }
    return currency;
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
          <h5>USD - United State Dollar</h5>
          <div className="sub-header">
            <h1 style={{cssFloat: 'left'}}>USD</h1>
            <input id="input-value" type="number" value={this.state.value} onChange={(event) => this.onChangeValue(event)}/>
          </div>
        </div>
        <div className="content">
          { isAPIReady ?
          <ShowedCurrency 
            list={this.state.currencyShowed} 
            rates={this.state.rates}
            value={this.state.value}
            namelist={this.state.currencyName}
            handler={this.deleteAShowedCurrency.bind(this)}/>
            : null
          }
          <div style={addCurrency}>
          { !this.state.isAddCurrency ? 
            <button className="btn-green" style={{width: '100%'}} onClick={()=> this.addMoreCurrency()}>(+) Add More Currencies</button>
            :
            <div>
              {this.getListOfCurrency()}
              <button className="btn-green" style={{width: '25%'}} onClick={() => this.addNewShowedCurrency()}>Submit</button>            
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
