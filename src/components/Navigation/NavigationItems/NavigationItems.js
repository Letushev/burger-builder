import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import NavigationItem  from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <Aux>
      <NavigationItem link={ '/' }>Builder</NavigationItem>
      {
        props.isAuth ? 
          <NavigationItem link={ '/orders' }>Orders</NavigationItem> : 
          null
      }
      { 
        props.isAuth ? 
          <NavigationItem link={ '/logout' }>Log Out</NavigationItem> :
          <NavigationItem link={ '/auth' }>Authenticate</NavigationItem>
      }
    </Aux>
);

export default navigationItems;