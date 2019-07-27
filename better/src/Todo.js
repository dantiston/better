import React from 'react';

class Todo extends React.Component {

    init(props) {
        this.props = props;
    }

    render() {
        return (
            <div>
                {this.props.handleRemove && <button
                    style={this.props.buttonStyle}
                    onClick={this.props.handleRemove}>
                    x
                </button>}
                <span style={{textDecoration: this.props.finished ? 'line-through' : 'none'}}>{this.props.value}</span>
            </div>
        );
    }

}

export default Todo;
