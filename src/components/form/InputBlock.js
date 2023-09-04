import React, { useEffect, useState } from "react";

import { InputArea } from "./InputArea";

function InputBlock(props) {
    let noNameStyle = props.noNameStyleProp ? {display: 'block', paddingTop: '15px'} : {display: 'none'};
    let firstPlusStyle = props.firstPlusProp ? {display: 'block'} : {display: 'none'};
    let incorrectPhoneStyle = props.incorrectPhoneStyleProp ? {display: 'block'} : {display: 'none'};
    let invalidSmsStyle = props.invalidSmsStyleProp ? {display: 'block'} : {display: 'none'};

    
    return(
        <>
            <div className="container" style={{paddingTop: '20px'}}>
                    <label htmlFor="name"> Name: </label>
                    <InputArea onChange={props.nameOnChange} id="name"/>
                    <div>
                        <span style={noNameStyle} className="auth_error" id="first_plus">Name cannot be empty</span>
                    </div>
            </div>

            <div className="container">
                <div style={{padding: '16px'}}>
                    <label htmlFor="phone_number"> Phone: </label>
                    <InputArea onChange={props.phoneOnChange} id="phone_number"/>
                </div>
                <div>
                    <span style={firstPlusStyle} className="auth_error" id="first_plus">Number must start by plus</span>
                </div>
                <div>
                    <span style={incorrectPhoneStyle} className="auth_error" id="incorrect">This number does not exist</span>
                </div>
                <div style={{paddingTop: '15px', paddingBottom: '15px'}}>
                    <button id="sign_in_button" onClick={props.onPhoneClick}>Enter phone number</button>
                </div>
            </div>
        
            <div className="container">
                <div style={{paddingTop: '60px', paddingBottom: '15px'}}>
                    <label htmlFor="sms_code_form"> SMS: </label>  
                    <InputArea onChange={props.smsOnChange} id='sms_code_form'/>
                </div>
                <div>
                    <span style={invalidSmsStyle} className="auth_error" id="invalid_sms_code">This SMS code is invalid</span>
                </div>
                <div style={{paddingTop: '15px', paddingBottom: '15px'}}>
                    <button id="confirm_code" onClick={props.onSmsClick}>Enter SMS</button>
                </div>
            </div>
        </>
    )
}

export  { InputBlock }