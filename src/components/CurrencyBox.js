import React from 'react';

const boxStyle = {
	position: 'relative',
	background: 'white',
	padding: '20px',
	margin: '20px 0',
	border: 'solid 2px #777',
	borderRadius: '10px',
}

const currencyStyle = {
	display: 'inline-block', 
	width: '80%',
}

const buttonStyle = {
	position: 'absolute',
	top: '35%',
	display: 'inline-block', 
	width: '10%',
	margin: '0 5%',
	textAlign: 'center',
	background: '#f37070',
	padding: '7px 0',
	fontWeight: 'bold'
}

const CurrencyBox = (props) => {
	return (
		<div style={boxStyle}>
			<div style={currencyStyle}>
				<h3>{props.currency} <span style={{cssFloat: 'right'}}>{props.value}</span></h3>
				<h6><i>{props.currency} - {props.name}</i></h6>
				<h6>1 USD =  {props.currency} {props.rate}</h6>		
			</div>
          	
      		<button style={buttonStyle} className="btn btn-main" value={props.currency} onClick={props.handler}>(-)</button>	
        </div>
	)
}

export default CurrencyBox;