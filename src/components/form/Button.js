import React from 'react'

class Button extends React.Component {

    render() {
        return (
            <button type={'submit'} id={this.props.id} onClick={this.props.onClick}>{this.props.data}</button>
        )
    }
}

export  { Button }