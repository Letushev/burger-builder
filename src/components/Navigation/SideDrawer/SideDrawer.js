import React from 'react';
import styles from './SideDrawer.css';

import Aux from '../../../hoc/Auxiliary';
import Logo from '../../Logo/Logo';
import NavigationItems from '..//NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  const classes = [styles['side-drawer']];
  if (props.open) {
    classes.push(styles['opened']);
  } else {
    classes.push(styles['closed']);
  }

  return (
    <Aux>
      <Backdrop show={ props.open } close={ props.close } />
      <div className={ classes.join(' ') } onClick={ props.close }>
        <Logo />
        <nav>
          <NavigationItems isAuth={ props.isAuth } />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;