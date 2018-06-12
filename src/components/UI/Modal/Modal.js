import React, { Component } from 'react';
import styles from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.purchasing !== this.props.purchasing || nextProps.children !== this.props.children;
  }

  render() {
    const show = this.props.show ? styles['show'] : '';
    return (
      <Aux>
        <Backdrop show={ this.props.show } close={ this.props.onModalClose } />
        <div className={ styles['modal'] + ' ' + show }>
          { this.props.children }
        </div>
      </Aux>
    );
  }
}

export default Modal;