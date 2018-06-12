import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/order';
import styles from './ContactData.css';

import FormControl from '../../../components/UI/FormControl/FormControl';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import axiosOrders from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/helpers';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
          autoComplete: 'name'
        },
        value: '',
        validationRules: {
          required: true,
          maxLength: 50
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          autoComplete: 'email'
        },
        value: '',
        validationRules: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
          autoComplete: 'country-name'
        },
        value: '',
        validationRules: {},
        valid: true
      }
    },
    allIsValid: false
  }

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });
 
    const customerData = {};
    for (const info in this.state.orderForm) {
      customerData[info] = this.state.orderForm[info].value;
    }

    const data = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: customerData,
      userID: this.props.userID
    }
    
    this.props.purchaseBurger(data, this.props.token);
  }

  controlChangedHandler = (event, element) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[element] };

    updatedElement.value = event.target.value;
    updatedElement.valid = checkValidity(event.target.value, updatedElement.validationRules);
    updatedElement.touched = true;
    updatedOrderForm[element] = updatedElement;
    
    let allIsValid = true;
    for (const info in updatedOrderForm) {
      allIsValid = updatedOrderForm[info].valid && allIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, allIsValid: allIsValid });
  } 

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <div className={ styles['contact-data'] }>
        <h2>Enter your contact data</h2>
        { this.props.loading ? <Loader /> :
            <form onSubmit = { this.orderHandler }>
              { 
                formElementsArray.map(element => (
                  <FormControl
                    key={ element.id }
                    elementType={ element.config.elementType }
                    elementConfig={ element.config.elementConfig }
                    value={ element.config.value }
                    changed = { (event) => this.controlChangedHandler(event, element.id) }
                    valid = { element.config.valid } 
                    shouldBeValidated = { !!element.config.validationRules }
                    touched = { element.config.touched } />
                )) 
              }
              <Button 
                type='weighty'
                isDisabled = { !this.state.allIsValid } >Order</Button>
            </form> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosOrders));