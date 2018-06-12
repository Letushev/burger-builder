import React from 'react';
import styles from './OrderSummary.css';

import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredients = Object.keys(props.ingredients)
    .map((ingrKey, index) => {
      return (
        <li key={ ingrKey + index }>
          <span style={ {textTransform: 'capitalize'} }>{ ingrKey }</span>: { props.ingredients[ingrKey] }
        </li>
      );
    });
  return (
    <div className={ styles['order-summary'] }>
      <h3>Your order</h3>
      <p>Ingredients:</p>
      <ul>
        { ingredients }
      </ul>
      <p>Total Price: { props.price.toFixed(2) }</p>
      <Button 
        type='danger'
        clicked={ props.purchaseCancel }>Cancel</Button>
      <Button 
        type='success'
        clicked={ props.purchaseContinue }>Continue</Button>
    </div>
  );
}

export default orderSummary;