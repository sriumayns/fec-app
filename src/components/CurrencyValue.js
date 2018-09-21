import React from 'react';

const inputSectionStyle = {
	display: 'table-cell',
	width: '100vw',
	verticalAlign: 'middle'
}

const inputValueStyle = {
  float: 'right',
  fontSize: '24px',
  width: '30%',
  margin: '7px 0',
  padding: '5px 10px',
}

const CurrencyValue = (props) => (
	<div>
    <h5>USD - United State Dollar</h5>
    <div style={inputSectionStyle}>
      <h1 style={{cssFloat: 'left'}}>USD</h1>
      <input style={inputValueStyle} type="number" value={props.value} onChange={props.handlerInput}/>
    </div> 
  </div>
)

export default CurrencyValue;