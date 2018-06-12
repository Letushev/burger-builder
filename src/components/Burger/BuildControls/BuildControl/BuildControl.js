import React from 'react';
import styles from './BuildControl.css';

import Button from '../../../UI/Button/Button';

const buildControl = props => {
  return (
    <div className= { styles['build-control'] }>
      <span className={ styles['label'] }>
        { props.label }
      </span>
      <Button 
        type='success' 
        clicked={ props.addIngredient }>Add</Button>
      <Button
        type='danger' 
        clicked={ props.removeIngredient }
        isDisabled={ props.disabled }>Remove</Button>
    </div>
  );
}

export default buildControl;