import ReactDOM from 'react-dom';
import { Component } from 'react';

const modalRoot = document.getElementById('portal-root');

export default class extends Component {
  el = document.createElement('div');

  componentDidMount = () => {
    modalRoot.appendChild(this.el);
  }
  
  componentWillUnmount = () => {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
};


