import React from 'react';
import styles from './DrawerToggle.css';

const drawerToggle = props => (
  <div className={ styles['drawer-toggle'] } onClick={ props.clicked }>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;