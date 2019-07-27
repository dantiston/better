import React from 'react';
import Todo from './Todo.js';
import Immutable from 'immutable';

class App extends React.Component {

    state = {
        todos: Immutable.OrderedSet(),
        finished: Immutable.OrderedSet(),
        newtodo: '',
    }

    styles = {
        margin: '0 auto',
        width: 800,
        fontSize: '18pt',
    }

    buttonStyle = {
        fontSize: '14pt',
        margin: '0 10px',
    }

    inputStyle = {
        fontSize: '14pt',
    }

    renderTodos() {
        return (
            <ul>
                {this.state.todos.map(todo =>
                    <Todo
                        value={todo}
                        buttonStyle={this.buttonStyle}
                        handleRemove={() => {this.setState(oldState => {return {
                            todos: this.state.todos.remove(todo),
                            finished: this.state.finished.add(todo),
                        }})}}
                    />
                )}
                {!this.state.finished.isEmpty() && <hr />}
                {this.state.finished.map(todo =>
                    <Todo
                        value={todo}
                        buttonStyle={this.buttonStyle}
                        finished
                    />
                )}
            </ul>
        );
    }

    renderForm() {
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    this.setState(oldState => {return {
                        todos: oldState.todos.add(oldState.newtodo),
                        newtodo: '',
                    }});
                }}
            >
                <input
                    type='text'
                    name='newtodo'
                    value={this.state.newtodo}
                    onChange={e => this.setState({newtodo: e.target.value})}
                    style={this.inputStyle}
                />
                <button style={this.buttonStyle} type='button'>+</button>
            </form>
        );
    }

    render() {
        return (
            <div style={this.styles}>
                <h3>To dos</h3>
                {this.renderTodos()}
                {this.renderForm()}
            </div>
        );
    }

}

export default App;
