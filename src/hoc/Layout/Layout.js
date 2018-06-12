import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Layout.css';

import Aux from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    sideDrawerOpened: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ sideDrawerOpened: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpened: !prevState.sideDrawerOpened };
    });
  }

  render() {
    return (
      <Aux>
        <SideDrawer 
          open={ this.state.sideDrawerOpened } 
          close={ this.sideDrawerCloseHandler }
          isAuth={ this.props.isAuth } />
        <Toolbar 
          drawerToggle={ this.sideDrawerToggleHandler } 
          isAuth={ this.props.isAuth }/>
        <main className={ styles['content'] }>
          { this.props.children }
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);