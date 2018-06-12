import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.css';

const navigationItem = props => {
  return <NavLink 
    activeClassName={ styles['nav-item_active'] } 
    className={ styles['nav-item'] }
    to={ props.link }
    exact>
      { props.children }</NavLink>;
};

export default navigationItem;