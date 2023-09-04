import React, {useState, useEffect} from "react";
import '../styles/auth.css';
import '../styles/form.css';
import '../styles/style.css';
import { useNavigate } from 'react-router-dom';

import { InputBlock } from "./form/InputBlock";
import { Button } from "./form/Button";
import { Initials } from './main/Initials';

import {initializeApp} from "firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";

function AuthPage(props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [incorrect, setIncorrect] = useState();
    const [noName, setNoName] = useState();
    const [firstPlus, setFirstPlus] = useState();
    const [invalidSmsCode, setInvalidSmsCode] = useState();
    
    const userError = (reason) => {
        switch (reason) {
            case ("incorrect"):
                setIncorrect(true);
                setTimeout(() => {
                    setIncorrect(false);
                }, 3000)
                break;
            case ("no_name"):
                setNoName(true);
                setTimeout(() => {
                    setNoName(false);
                }, 3000)
                break;
            case ("first_plus"):
                setFirstPlus(true);
                setTimeout(() => {
                    setFirstPlus(false);
                }, 3000)
                break;
            case ("invalid_sms_code"):
                setInvalidSmsCode(true);
                setTimeout(() => {
                    setInvalidSmsCode(false);
                }, 3000)
                break;
        }
    }

    const firebaseConfig = {
        apiKey: "AIzaSyBXdfmRUM56vir3pD9VQLYvIR36OKukyMI",
        authDomain: "web-programming-itmo.firebaseapp.com",
        projectId: "web-programming-itmo",
        storageBucket: "web-programming-itmo.appspot.com",
        messagingSenderId: "74373191250",
        appId: "1:74373191250:web:144194481dd7352015718b",
        measurementId: "G-XJ4R16YM2F"
    }

    let app = initializeApp(firebaseConfig);
    let auth = getAuth(app);;

    useEffect(() => {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        auth.languageCode = 'en';

        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
            'size': 'invisible',
            'callback': (response) => {
            }
        }, auth);


    }, [])

    const navigateToMain = () => {
        navigate('/main', { replace: true });
    }

    const handlingPhoneNumber = () => {
        if (phone[0] !== '+') {
            userError('first_plus');
            return;
        }

        if (name === '') {
            userError('no_name');
            return;
        }
        
        let appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                userError("incorrect");
            });
    }

    const handlingSmsNumber = () => {
        if (name === '') {
            userError('no_name');
            return;
        }
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                const user = result.user;
                props.changeName(name)
                props.changeNumber(phone);
                sessionStorage.setItem('user_name', name);
                sessionStorage.setItem('user_phone_number', phone);
                navigateToMain();
            })
            .catch((error) => {
                userError('invalid_sms_code');
            });
    }


    const inputName = (evt) => {
        let value = evt.target.value;
        if ((!value || !(value.trim())) && (value !== 0)) {
        } else {
            setName(value);
        }
    }

    const inputPhone = (evt) => {
        let value = evt.target.value;
        if ((!value || !(value.trim())) && (value !== 0)) {
        } else {
            setPhone(value);
        }
    }

    const inputSms = (evt) => {
        let value = evt.target.value;
        if ((!value || !(value.trim())) && (value !== 0)) {
        } else {
            setCode(value);
        }
    }

    
    return (
        <div className="main--container">
            <header className='header'>
                <div className='horizon'>
                    <Initials name={props.initials.name} lesson={props.initials.lesson} lab={props.initials.lab}/>
                </div>
            </header>
            <div className="phone--container">
                <InputBlock nameOnChange={inputName} 
                            phoneOnChange={inputPhone} 
                            smsOnChange={inputSms} 
                            onPhoneClick={handlingPhoneNumber}
                            onSmsClick={handlingSmsNumber}
                            noNameStyleProp={noName}
                            firstPlusProp={firstPlus}
                            incorrectPhoneStyleProp={incorrect}
                            invalidSmsStyleProp={invalidSmsCode}
                            />
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
    
}

export  { AuthPage }