import React from 'react';
import styles from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => (
  <div className={ styles['summary'] }>
    <h1>Your tasty burger is ready!</h1>
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