import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/auth';
import styles from './Auth.css';

import FormControl from '../../components/UI/FormControl/FormControl';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';

import { checkValidity } from '../../shared/helpers';

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          autoComplete: 'current-password'
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    signUping: false
  }

  controlChangedHandler = (event, element) => {
    const updatedControls= { ...this.state.controls };
    const updatedElement = { ...updatedControls[element] };

    updatedElement.value = event.target.value;
    updatedElement.valid = checkValidity(event.target.value, this.state.controls[element].validationRules);
    updatedElement.touched = true;
    updatedControls[element] = updatedElement;

    this.setState({ controls: updatedControls });
  } 

  submitHandler = event => {
    event.preventDefault();
    this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUping);
  }

  authChangeHandler = event => {
    event.preventDefault();
    this.setState({ signUping: !this.state.signUping });
  }

  render() {
    if (this.props.isAuth) {
      return <Redirect to = '/' />;
    }

    const formElementsArray = [];
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    
    return (
      <div className={ styles['auth-form-wrapper'] }>
        { this.props.error ? <p style={{ color: "#E5A69F" }}>{ this.props.error.message }</p> : null }
        <form onSubmit={ this.submitHandler }>
          { 
            this.props.loading ? <Loader /> :
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
          <Button type='weighty'>{ this.state.signUping ? ' Sign Up' : ' Sign In' }</Button>
          <p>{ this.state.signUping ? 'Already have an account? ' : 'New to Burger Builder?' }
            <button type="button"
              className={ styles['auth-change-link'] } 
              onClick={ this.authChangeHandler }>{ this.state.signUping ? ' Sign In' : ' Sign Up' }</button>
          </p>
        </form>    
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, signUping) => dispatch(actionCreators.auth(email, password, signUping))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);