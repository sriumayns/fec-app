import React from 'react';

const containerStyle = {
  margin: '30px 0',
  textAlign: 'center'
}

const SelectCurrency = (props) => {
  if (!props.status) {
    return (
      <div style={containerStyle}>
        <button className="btn-green" style={{width: '100%'}} onClick={props.handlerStatus}>(+) Add More Currencies</button>
      </div>
    )
  } else {
  	return (
      <div style={containerStyle}>
    		<div className="form-group" style={{width:'75%', display: 'inline-block'}}>
          <select 
            className="form-control"  
            defaultValue=""
            onChange={props.handlerChange}>
            <option value="" disabled>-- Choose Currency--</option> : null
            { props.currencyList.map((currency, i) => (
              props.currencyShowed.indexOf(currency) === -1 ?
              <option value={currency} key={i}>{currency}</option> : null
            ))}
          </select>
        </div>
        <button className="btn-green" style={{width: '25%'}} onClick={props.handlerSubmit}>Submit</button>
      </div>
  	)
  }
}

export default SelectCurrency;