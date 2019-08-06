/*
@flow strict-local
*/

import React from 'react';

type Props = {|
    buttonStyle: Object,
    value: string,
    timeCompleted?: Date, // Only present if completed
    handleRemove?: (Date) => void, // Only present if not completed
|};

class Todo extends React.Component<Props, {}> {

    init(props: Props) {
        this.props = props;
    }

    renderTimeCompleted(time: Date) {
        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }

    render() {
        return (
            <div>
                {this.props.handleRemove && <button
                    style={this.props.buttonStyle}
                    onClick={() => {this.props.handleRemove && this.props.handleRemove(new Date())}}>
                    X
                </button>}
                <span
                    style={{textDecoration: this.props.timeCompleted != null ? 'line-through' : 'initial'}}>
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
