import React from "react";
import '../../styles/form.css';
import '../../styles/style.css';

import { InputArea } from "./InputArea";
import { RadioCheck } from "./RadioCheck";
import { Button } from './Button';

function Form(props) {
    let noX = props.noX ? {display: 'block'} : {display: 'none'};
    let noY = props.noY ? {display: 'block'} : {display: 'none'};
    let noR = props.noR ? {display: 'block'} : {display: 'none'};
    let yNotNumber = props.yNotNumber ? {display: 'block'} : {display: 'none'};
    let yNoInRange = props.yNoInRange ? {display: 'block'} : {display: 'none'};


    function createCheckbox (type, id, label, name, onChange, value) {
        return (
            <RadioCheck type={type} id={id} label={label} name={name} onChange={onChange} value={value}/>
        )
    }
    
    return (
        <form className="main__form">
            <fieldset className="form__group">
                <legend>Please select your numbers</legend>
                <div className="group--buttons" id='x_container'>
                    <span className="group--text"> X:</span>
                    {createCheckbox("radio", "x2", -1.5, 'x_param', props.radioOnChange, -1.5)}
                    {createCheckbox("radio", "x3", -1, 'x_param', props.radioOnChange, -1)}
                    {createCheckbox("radio", "x4", -0.5, 'x_param', props.radioOnChange, -0.5)}
                    {createCheckbox("radio", "x5", 0, 'x_param', props.radioOnChange, 0)}
                    {createCheckbox("radio", "x6", 0.5, 'x_param', props.radioOnChange, 0.5)}
                    {createCheckbox("radio", "x7", 1, 'x_param', props.radioOnChange, 1)}
                    {createCheckbox("radio", "x8", 1.5, 'x_param', props.radioOnChange, 1.5)}
                    {createCheckbox("radio", "x9", 2, 'x_param', props.radioOnChange, 2)}
                </div>
                <div className="error" style={noX}>
                    Please select X
                </div>
                <div className="group--buttons" id='y-container'>
                    <span className="group--text"> Y:</span>
                    <InputArea onChange={props.inputOnChange}/>
                </div>
                <div className="error" style={noY}>
                    Y cannot be empty
                </div>
                <div className="error" style={yNotNumber}>
                    Y must be a number
                </div>
                <div className="error" style={yNoInRange}>
                    Y is out of range (-5; 3)
                </div>
                <div className="group--buttons" id='r_container'>
                    <span className="group--text"> R:</span>
                    {createCheckbox("checkbox", "r1", 1, 'r_param', props.checkBoxOnChange, 1)}
                    {createCheckbox("checkbox", "r2", 1.5, 'r_param', props.checkBoxOnChange, 1.5)}
                    {createCheckbox("checkbox", "r3", 2, 'r_param', props.checkBoxOnChange, 2)}
                    {createCheckbox("checkbox", "r4", 2.5, 'r_param', props.checkBoxOnChange, 2.5)}
                    {createCheckbox("checkbox", "r5", 3, 'r_param', props.checkBoxOnChange, 3)}
                </div>
                <div className="error" style={noR}>
                    Please select R
                </div>
                <div className="button--sender">
                    <Button data={"Submit"} onClick={props.buttonFunction}/>
                    <Button data={"Artur"} onClick={props.buttonFunction}/>
                </div>
            </fieldset>
        </form>
    )
}

export { Form }