import React from 'react'
import ReactDOM from 'react-dom'

class InputArea extends React.Component {
    render() {
        return (
            <input id={this.props.id} onChange={this.props.onChange} maxLength="15" autoComplete="off"/>
        )
    }
}

export  { InputArea }