import React from 'react';
import styles from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';
import Button from '../../UI/Button/Button';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon' , type: 'bacon' }
];

const buildControls = props => {
  return (
    <div className={ styles['build-controls'] }>
      <p>Current price: ${ props.price.toFixed(2) }</p>
      { controls.map(ctrl => {
        return <BuildControl 
          key={ ctrl.label } 
          label={ ctrl.label } 
          addIngredient={ () => props.addIngredient(ctrl.type) } 
          removeIngredient={ () => props.removeIngredient(ctrl.type) }
          disabled={ props.disabledInfo[ctrl.type] } />
        }) }
      <Button
        type='weighty'
        clicked={ props.purchase }
        isDisabled={ !props.purchasable }>
          { props.isAuth ? 'Order' : 'Sign In to order' }
      </Button>
    </div> 
  );
};

export default buildControls;