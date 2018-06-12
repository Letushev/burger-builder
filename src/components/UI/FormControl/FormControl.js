import React from 'react';
import styles from './FormControl.css';

const formControl = props => {
  let element = null;
  const classes = [styles['control']];

  if (!props.valid && props.shouldBeValidated && props.touched) {
    classes.push(styles['invalid']);
  }

  switch (props.elementType) {
    case 'input':
      element = <input 
        className={ classes.join(' ') } 
        { ...props.elementConfig }
        value={ props.value }
        onChange = { props.changed } />;
      break;
    case 'textarea':
      element = <textarea 
        className={ classes.join(' ') } 
        { ...props.elementConfig }
        value={ props.value }
        onChange = { props.changed } />;
      break;
    default:
      element = <input
        className={ classes.join(' ') } 
        { ...props.elementConfig }
        value={ props.value }
        onChange = { props.changed } />;
  }
  
  // TODO: label for input id
  return (
    <div>
      <label>{ props.label }</label>
      { element }
    </div>
  );
}

export default formControl;