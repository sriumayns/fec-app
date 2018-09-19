import React from 'react';
import CurrencyBox from './CurrencyBox';

const ShowedCurrency = (props) => {
	return (
		<div>
			{props.list.map((currency, i) => (
            <CurrencyBox 
              currency={currency} 
              name={props.namelist[currency]}  
              rate={props.rates[currency]} 
              value={(props.value*props.rates[currency]).toFixed(4)} 
              key={i}
              handler={props.handler}/> 
          ))}
		</div>
	)
}

export default ShowedCurrency;