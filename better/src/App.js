/*
@flow strict-local
*/

import React from 'react';
import Immutable from 'immutable';

import Todo from './Todo.react.js';
import Form from './Form.react.js';

type State = {|
    todos: Immutable.OrderedSet<string>,
    finished: Immutable.OrderedSet<[string, Date]>,
|}

class App extends React.Component<{}, State> {

    tasks = [
        'Put Tommy out',
        'Feed and medicate Tommy',
        'Feed cats',
        'Fill animal waters',
        'Wash bottles',
        'Check diaper pail',
    ]

    state = this.freshState();

    styles = {
        margin: '0 auto',
        width: 800,
        fontSize: '24pt',
    }

    buttonStyle = {
        fontSize: '18pt',
        margin: '0 10px',
    }

    secondsInTheDay = 86400000;

    componentDidMount() {
        this.repeatAt(0, () => {
            this.setState(this.freshState());
        })
    }

    freshState() {
        return {
            todos: Immutable.OrderedSet(this.tasks),
            finished: Immutable.OrderedSet(),
        };
    }

    repeatAt(hour: number, f: () => void) {
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
        return (
            <ul>
                {this.state.todos.map(todo =>
                    <Todo
                        key={i++}
                        value={todo}
                        buttonStyle={this.buttonStyle}
                        handleRemove={() => {this.setState(oldState => {
                            return {
                                todos: this.state.todos.remove(todo),
                                finished: this.state.finished.add([todo, new Date()]),
                            };
                        })}}
                    />
                )}
                {!this.state.finished.isEmpty() && !this.state.todos.isEmpty() && <hr />}
                {this.state.finished.map(([todo, date]) =>
                    <Todo
                        key={i++}
                        value={todo}
                        buttonStyle={this.buttonStyle}
                        timeCompleted={date}
                    />
                )}
            </ul>
        );
    }

    render() {
        return (
            <div style={this.styles}>
                <h3>To dos</h3>
                {this.renderTodos()}
                <Form
                    addTodo={(todo) => {this.setState(prevState => ({todos: prevState.todos.add(todo)}))}}
                    buttonStyle={this.buttonStyle}
                />
            </div>
        );
    }

}

export default App;
