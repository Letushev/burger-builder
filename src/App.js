import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actionCreators from './store/actions/auth';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

class App extends Component {
  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    let routes = null;

    if (this.props.isAuth) {
      routes = 
        <Switch>
          <Route path="/checkout" component={ asyncCheckout } />
          <Route path="/orders" component={ asyncOrders } />
          <Route path="/logout" component={ Logout } />
          <Route path="/" exact component={ BurgerBuilder } />
          <Redirect to="/" />
        </Switch>;
    } else {
      routes = 
        <Switch>
          <Route path="/auth" component={ asyncAuth } />
          <Route path="/" exact component={ BurgerBuilder } />
          <Redirect to="/" />
        </Switch>
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkToken: () => dispatch(actionCreators.checkToken())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
