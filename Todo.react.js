import React from 'react';

class Todo extends React.Component {
  init(props) {
    this.props = props;
  }

  renderTimeCompleted(time) {
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  }

  render() {
    return React.createElement("div", null, this.props.handleRemove && React.createElement("button", {
      style: this.props.buttonStyle,
      onClick: () => {
        this.props.handleRemove && this.props.handleRemove(new Date());
      }
    }, "X"), React.createElement("span", {
      style: {
        textDecoration: this.props.timeCompleted != null ? 'line-through' : 'initial'
      }
    }, this.props.value), this.props.timeCompleted != null ? React.createElement("span", null, ' ' + this.renderTimeCompleted(this.props.timeCompleted)) : null);
  }

}

export default Todo;