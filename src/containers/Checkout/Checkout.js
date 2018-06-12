import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  continueHandler = () => {
    this.props.history.replace('/checkout/contact');
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      (!this.props.ingredients || this.props.purchased) ? <Redirect to='/' /> :
        <div>
          <CheckoutSummary 
            ingredients={ this.props.ingredients }
            continue={ this.continueHandler } 
            cancel={ this.cancelHandler } />
          <Route 
            path={ this.props.match.path + '/contact' } 
            component = { ContactData } />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);