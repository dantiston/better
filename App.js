function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Immutable from 'immutable';
import Todo from './Todo.react.js';
import Form from './Form.react.js';

class App extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "tasks", ['Put Tommy out', 'Feed and medicate Tommy', 'Feed cats', 'Fill animal waters', 'Wash bottles', 'Check diaper pail']);

    _defineProperty(this, "state", this.freshState());

    _defineProperty(this, "styles", {
      margin: '0 auto',
      width: 800,
      fontSize: '24pt'
    });

    _defineProperty(this, "buttonStyle", {
      fontSize: '18pt',
      margin: '0 10px'
    });

    _defineProperty(this, "secondsInTheDay", 86400000);
  }

  componentDidMount() {
    this.repeatAt(0, () => {
      this.setState(this.freshState());
    });
  }

  freshState() {
    return {
      todos: Immutable.OrderedSet(this.tasks),
      finished: Immutable.OrderedSet()
    };
  }

  repeatAt(hour, f) {
    const now = new Date();
    const date = now.getDate() + (now.getHours() < hour ? 0 : 1);
    const start = new Date(now.getFullYear(), now.getMonth(), date, hour, 0, 0, 0);
    const wait = start.getTime() - now.getTime();
    console.log(wait);
    setTimeout(() => {
      f();
      setInterval(f, this.secondsInTheDay);
    }, wait);
  }

  renderTodos() {
    let i = 0;
    return React.createElement("ul", null, this.state.todos.map(todo => React.createElement(Todo, {
      key: i++,
      value: todo,
      buttonStyle: this.buttonStyle,
      handleRemove: () => {
        this.setState(oldState => {
          return {
            todos: this.state.todos.remove(todo),
            finished: this.state.finished.add([todo, new Date()])
          };
        });
      }
    })), !this.state.finished.isEmpty() && !this.state.todos.isEmpty() && React.createElement("hr", null), this.state.finished.map(([todo, date]) => React.createElement(Todo, {
      key: i++,
      value: todo,
      buttonStyle: this.buttonStyle,
      timeCompleted: date
    })));
  }

  render() {
    return React.createElement("div", {
      style: this.styles
    }, React.createElement("h3", null, "To dos"), this.renderTodos(), React.createElement(Form, {
      addTodo: todo => {
        this.setState(prevState => ({
          todos: prevState.todos.add(todo)
        }));
      },
      buttonStyle: this.buttonStyle
    }));
  }

}

export default App;