import React, { Component } from 'react';
import axiosOrders from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/order';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
import Loader from '../../components/UI/Loader/Loader';

class Orders extends Component {
  componentDidMount () {
    this.props.fetchOrders(this.props.token, this.props.userID);
  }

  render() {
    return (
      this.props.loading ? <Loader /> :
        <div>
          { this.props.orders.map(order => (
            <Order 
              key={ order.id }
              ingredients={ order.ingredients }
              price={ order.price } /> 
          )) }
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, userID) => dispatch(actionCreators.fetchOrders(token, userID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));