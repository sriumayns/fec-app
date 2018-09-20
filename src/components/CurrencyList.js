import React from 'react';
import CurrencyBox from './CurrencyBox';

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
    			{this.props.list.map((currency, i) => (
            <CurrencyBox 
              currency={currency} 
              name={this.state.currencyName[currency]}  
              rate={this.state.rates[currency]} 
              value={(this.props.value*this.state.rates[currency])} 
              key={i}
              handler={this.props.handler}/> 
          ))}
    		</div>
    	)
    }
  }
}

export default CurrencyList;