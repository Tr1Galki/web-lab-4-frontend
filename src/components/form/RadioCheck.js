import React from 'react'

function RadioCheck(props) {
    return (
        <>
            <input type={props.type} id={props.id} name={props.name} onChange={props.onChange} value={props.value} style={props.style}/>
            <label htmlFor={props.id} style={props.style}>
                {props.label}
            </label>
        </>
    )
}

export  { RadioCheck }