/*
@flow strict-local
*/

import React from 'react';

type Props = {|
    addTodo: (string) => void,
    buttonStyle: Object,
|};

type State = {|
    newtodo: string,
|};

class Form extends React.Component<Props, State> {

    inputStyle = {
        fontSize: '18pt',
    }

    state = {
        newtodo: '',
    }

    render() {
        return <form
            onSubmit={e => {
                e.preventDefault();
                this.props.addTodo(this.state.newtodo);
                this.setState({
                    newtodo: '',
                });
            }}
        >
            <input
                type='text'
                name='newtodo'
                value={this.state.newtodo}
                onChange={e => this.setState({newtodo: e.target.value})}
                style={this.inputStyle}
            />
            <button style={this.props.buttonStyle} type='button'>+</button>
        </form>;
    }

}

export default Form;
