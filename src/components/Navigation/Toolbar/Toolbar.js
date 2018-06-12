import React from 'react';
import styles from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
  <header className={ styles['toolbar'] }>
    <Logo />
    <nav className={ styles['nav'] }>
      <NavigationItems isAuth={ props.isAuth } />
    </nav>
    <DrawerToggle clicked={ props.drawerToggle } />
  </header>
);

export default toolbar;