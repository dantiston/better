/*
@flow strict-local
*/

import React from 'react';
import Immutable from 'immutable';

import Todo from './Todo.js';

type State = {|
    todos: Immutable.OrderedSet<string>,
    finished: Immutable.OrderedSet<[string, Date]>,
    newtodo: string,
|}

class App extends React.Component<{}, State> {

    tasks = [
        'Feed Tommy',
        'Feed cats',
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

    inputStyle = {
        fontSize: '18pt',
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
            newtodo: '',
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
