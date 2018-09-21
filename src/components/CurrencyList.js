import React from 'react';
import CurrencyBox from './CurrencyBox';
import AddCurrency from './AddCurrency';

const api_rates = 'https://api.exchangeratesapi.io/latest?base=USD';
const api_currency_name = 'https://openexchangerates.org/api/currencies.json';

const messageStyle = {
  textAlign: 'center',
  margin: '30px'
}

class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isRateLoaded: false,
      isCurrencyNameLoaded: false,
      rates: null,
      currencyList: null,
      currencyName : null,
      currencyShowed : ['IDR', 'EUR', 'GBP', 'SGD'],
      selectedCurrency: null,
      isAddCurrency: false
    };
  }
  
  componentDidMount() {
    fetch(api_rates)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isRatesLoaded: true,
            rates: result.rates,
            currencyList: Object.keys(result.rates).sort()
          });
        },
        (error) => {
          this.setState({
            isRatesLoaded: true,
            error
          });
        }
      )

     fetch(api_currency_name)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isCurrencyNameLoaded: true,
            currencyName: result
          });
        },
        (error) => {
          this.setState({
            isCurrencyNameLoaded: true,
            error
          });
        }
      )
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
    const { error, isRatesLoaded, isCurrencyNameLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isRatesLoaded || !isCurrencyNameLoaded) {
      return (
        <div style={messageStyle}>
          <h5>Loading...</h5>
        </div>
      );
    } else {
    	return (
    		<div>
    			{this.state.currencyShowed.map((currency, i) => (
            <CurrencyBox 
              currency={currency} 
              name={this.state.currencyName[currency]}  
              rate={this.state.rates[currency]} 
              value={(this.props.value*this.state.rates[currency])} 
              key={i}
              handler={this.deleteAShowedCurrency.bind(this)}/> 
          ))}
          <AddCurrency 
              status={this.state.isAddCurrency}
              currencyList={this.state.currencyList} 
              currencyShowed={this.state.currencyShowed} 
              handlerChange={(event) => this.onChangeSelectCurrency(event)}
              handlerSubmit={() => this.addNewShowedCurrency()}
              handlerStatus={()=> this.addMoreCurrency()}/>
    		</div>
    	)
    }
  }
}

export default CurrencyList;