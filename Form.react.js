function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

class Form extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "inputStyle", {
      fontSize: '18pt'
    });

    _defineProperty(this, "state", {
      newtodo: ''
    });
  }

  render() {
    return React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        this.props.addTodo(this.state.newtodo);
        this.setState({
          newtodo: ''
        });
      }
    }, React.createElement("input", {
      type: "text",
      name: "newtodo",
      value: this.state.newtodo,
      onChange: e => this.setState({
        newtodo: e.target.value
      }),
      style: this.inputStyle
    }), React.createElement("button", {
      style: this.props.buttonStyle,
      type: "button"
    }, "+"));
  }

}

export default Form;