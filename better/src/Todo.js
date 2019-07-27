import React from 'react';

/*
 * props.handleRemove
 * props.buttonStyle
 * props.finished
 * props.value
 * props.timeCompleted
 */
class Todo extends React.Component {

    init(props) {
        this.props = props;
    }

    renderTimeCompleted(time) {
        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }

    render() {
        return (
            <div>
                {this.props.handleRemove && <button
                    style={this.props.buttonStyle}
                    onClick={() => {this.props.handleRemove(new Date())}}>
                    X
                </button>}
                <span
                    style={{textDecoration: this.props.finished ? 'line-through' : 'initial'}}>
                    {this.props.value}
                </span>
                {this.props.timeCompleted != null
                    ? <span>{' ' + this.renderTimeCompleted(this.props.timeCompleted)}</span>
                    : null
                }
            </div>
        );
    }

}

export default Todo;
