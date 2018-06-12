import React from 'react';
import styles from './Order.css';

const order = props => {

  const ingredients= [];
  for (const ingr in props.ingredients) {
    ingredients.push(
      <span 
        className={ styles['ingredient'] }
        key={ ingr }>
          { ingr } ({ props.ingredients[ingr] })
      </span>
    );
  }

  return (
    <div className={ styles['order'] }>
      <p>Ingredients: { ingredients }</p>
      <p>Price: USD { <span style={ { color: '#eac67a' } }>{ props.price.toFixed(2) }</span> }</p>
    </div>
  );
};

export default order;