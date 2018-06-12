import React from 'react';
import styles from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => (
  <div className={ styles['summary'] }>
    <h1>Please, your tasty burger</h1>
    <Burger ingredients={ props.ingredients } />
    <Button 
      type='success'
      clicked={ props.continue }>Continue</Button>
    <Button 
      type='danger'
      clicked={ props.cancel }>Cancel</Button>
  </div>
);

export default checkoutSummary;