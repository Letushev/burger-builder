import React from 'react';
import sadImage from '../../assets/images/sad.png'
import styles from './ErrorMessage.css';

const errorMessage = props => (
  <div className={ styles['error-wrapper'] }>
    <img src={ sadImage } alt='sad emoji' />
    <p>{ props.message }</p>
  </div>
);

export default errorMessage;