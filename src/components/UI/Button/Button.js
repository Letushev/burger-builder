import React from 'react';
import styles from './Button.css';

const button = props => (
  <button 
    className={ styles['button'] + ' ' + styles[props.type] }
    onClick={ props.clicked }
    disabled={ props.isDisabled }>
      { props.children }
  </button>
);

export default button;