import { Component } from 'react';

const createStubbedComponent = (props = {}) => {
  class Control extends Component {
    render () {
      return (
        <div {...this.props} />
      );
    }
  }

  Object.keys(props).forEach(k => {
    const { type, value } = props[k];
    type === 'STATIC' ? Control[k] = value
      : type === 'DEFINED' ? Object.defineProperty(Control, k, { value })
        : Control.prototype[k] = value;
  });

  return Control;
};

export default createStubbedComponent;
