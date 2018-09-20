import React from 'react';

const CurrencyValue = (props) => (
	<div>
    <h5>USD - United State Dollar</h5>
    <div className="sub-header">
      <h1 style={{cssFloat: 'left'}}>USD</h1>
      <input id="input-value" type="number" value={props.value} onChange={props.handlerInput}/>
    </div> 
  </div>
)

export default CurrencyValue;