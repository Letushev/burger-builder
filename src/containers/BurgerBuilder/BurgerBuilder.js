import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/burgerBuilder';
import { initPurchase } from '../../store/actions/order';

import Aux from '../../hoc/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import axiosOrders from '../../axios-orders';


export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.fetchIngredientsHandler();
  }

  checkPurchasability(ingredients) {
    let sum = 0;
    for (const ingr in ingredients) {
      sum += ingredients[ingr];
    }
    
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.initPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (const ingr in disabledInfo) {
      disabledInfo[ingr] = disabledInfo[ingr] <= 0;
    }

    let burger = this.props.error ? <ErrorMessage message={ this.props.error } /> : <Loader />;
    let orderSummary = null;
    
    if (this.props.ingredients) {
      burger = 
        <Aux>
          <Burger ingredients={ this.props.ingredients } />

          <BuildControls 
            addIngredient={ this.props.addIngredientHandler }
            removeIngredient ={ this.props.removeIngredientHandler } 
            disabledInfo={ disabledInfo } 
            price={ this.props.totalPrice }
            purchasable={ this.checkPurchasability(this.props.ingredients) } 
            purchase={ this.purchaseHandler }
            isAuth={ this.props.isAuth } /> 
        </Aux> ;

      orderSummary =
        <OrderSummary 
          ingredients={ this.props.ingredients } 
          price={ this.props.totalPrice }
          purchaseContinue= { this.purchaseContinueHandler }
          purchaseCancel={ this.purchaseCancelHandler } />;
    }

    return (
      <Aux>
        <Modal show={ this.state.purchasing } onModalClose={ this.purchaseCancelHandler }>
          { orderSummary }
        </Modal>
        { burger }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: name => dispatch(actionCreators.addIngredient(name)),
    removeIngredientHandler: name => dispatch(actionCreators.removeIngredient(name)),
    fetchIngredientsHandler: () => dispatch(actionCreators.fetchIngredients()),
    initPurchase: () => dispatch(initPurchase())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));