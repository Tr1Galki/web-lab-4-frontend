import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

import '../styles/chat.css';    

import { Form } from './form/Form';
import Canvas from './main/Canvas';
import { Table } from './main/Table';
import { Button } from './form/Button';
 
let stompClient = null;
function MainPage(props) {
    const navigate = useNavigate();
    const SOCKET_URL = 'http://localhost:8080/ws';
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [r, setR] = useState([]);
    const [dots, setDots] = useState([]);
    const [noX, setNoX] = useState();
    const [noY, setNoY] = useState();
    const [noR, setNoR] = useState();
    const [yNotNumber, setYNotNumber] = useState();
    const [yNoInRange, setYNoInRange] = useState();

    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] =useState("CHATROOM");
    const [privateChats, setPrivateChats] = useState(new Map());
    const [userData, setUserData] = useState({
        username: props.username,
        phoneNumber: props.phoneNumber,
        recievername: "",
        connected: false,
        message: ""
    });

    useEffect(() => {
        if (!userData.connected) {
            connect();
        }
    })

    const connect = () => {
        if (!props.username || !props.phoneNumber) {
            if (!sessionStorage.getItem('user_name') || !sessionStorage.getItem('user_phone_number')) {
                navigate('/', { replace: true });
                return;
            }
            userData.username = sessionStorage.getItem('user_name');
            userData.phoneNumber = sessionStorage.getItem('user_phone_number');
        }
        let Sock = new SockJS(SOCKET_URL);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        userData.connected = true;
        console.log(userData);
        stompClient.subscribe('/chatroom/public',                       onPublicMessageHandler);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageHandler);
        stompClient.subscribe('/user/' + userData.username + '/dots',    onDotsMessageHandler);
        userJoin();
    }

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: 'JOIN'
        }
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
        let get = {
            owner: userData.username
        }
        stompClient.send("/app/get-dots", {}, JSON.stringify(get));
    }

    const onPublicMessageHandler = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN": 
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                let chatMessage = {
                    senderName: userData.username,
                    receiverName: payloadData.senderName,
                    message: '',
                    status: "ADD"
                }
                stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            case "ADD":
                if (!privateChats.get(payloadData.senderName)) {
                    if (!payloadData.message) {
                        return;
                    }
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
        }
    }

    const onPrivateMessageHandler = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            if (!payloadData.message) {
                return;
            }
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            privateChats.set(payloadData.senderName, []);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onDotsMessageHandler = (payload) => {
        let payloadData = JSON.parse(payload.body);
        payloadData.dots.forEach(dot => {
            dots.push(dot);
            setDots([...dots]);
        });
    }

    const onError = (error) => {
        console.log(error);
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData({...userData, "message": value})
    }

    const sendPublicValue=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName:tab,
                message: userData.message,
                status:"MESSAGE"
            }
            if(userData.username !== tab){
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const radioX = (evt) => { 
        setX(evt.target.value)
    }

    const inputY = (evt) => {
        let value = evt.target.value;
        if ((!value || !(value.trim())) && (value !== 0)) {
            setNoY(true);
        } else {
            setNoY(false);
            if (/^-?\d*(\.?\d+)?$/.test(value)) {
                setYNotNumber(false);
                let currY = parseFloat(value);
                if (currY > -5 && currY < 3) {
                    setY(parseFloat(value));
                    setYNoInRange(false);
                } else {
                    setYNoInRange(true);
                }
            } else {
                setYNotNumber(true);
            }
        }
    }

    const checkBoxR = (evt) => { 
        let checkbox = evt.target;
        let value = checkbox.value;
        if (checkbox.checked) {
            if (!r.includes(value)) {
                r.push(value);
                setR(r.concat());
            }
        } else {
            let index = r.indexOf(value);
            r.splice(index, 1);
            setR(r.concat());
        }
    }

    const mainSubmit = (evt) => {
        evt.preventDefault();
        if (!x) {
            userError("no_x");
            return
        }
        if (!y) {
            userError("no_y");
            return
        }
        if (r.length === 0) {
            userError("no_r");
            return
        }
        if (x && (y || y === 0)) {
            dotCreate(x, y);
        }
    }

    const dotCreate = (x, y) => {
        r.forEach(tempR => {
            let dot = {
                x: x,
                y: y,
                r : tempR,
                date: new Date().getTime(),
                owner: userData.username
            }
            sendDot(dot);
        })
    }

    const canvasEvent = (x, y) => {
        if (r.length === 0) {
            userError("no_r");
            return
        }
        dotCreate(x*r, y*r);
    }

    const sendDot = (dot) => {
        stompClient.send("/app/add-dot", {}, JSON.stringify(dot));
    }

    const userError = (reason) => {
        switch (reason) {
            case ("no_x"):
                setNoX(true);
                setTimeout(() => {
                    setNoX(false);
                }, 3000)
                break;
            case ("no_y"):
                setNoY(true);
                setTimeout(() => {
                    setNoY(false);
                }, 3000)
                break;
            case ("no_r"):
                setNoR(true);
                setTimeout(() => {
                    setNoR(false);
                }, 3000)
                break;
        }
    }


    return (
        <> 
            <div className='main_page'>
                <div className='left_side'>
                    <div className='form__container'>
                        <Form 
                            radioOnChange={radioX} 
                            inputOnChange={inputY} 
                            checkBoxOnChange={checkBoxR} 
                            buttonFunction={mainSubmit}
                            noX={noX}
                            noY={noY}
                            noR={noR}
                            yNoInRange={yNoInRange}
                            yNotNumber={yNotNumber}
                        />
                    </div>
                    <div className='horizont'>
                        <div className="canvas-container">
                            <Canvas dots={dots} canvasEvent={canvasEvent}/>     
                        </div>
                        <div className='table__container'>
                            <Table dots={dots}/>
                        </div> 
                    </div>
                </div>
                <div className='right_side'>
                    <div className='chat_container'>
                        <div className="container">
                            <div className="chat-box">
                                <div className="member-list">
                                    <ul>
                                        <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                                        {
                                            [...privateChats.keys()].map((name,index)=>(
                                                <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                {
                                    tab==="CHATROOM" && <div className="chat-content">
                                        <ul className="chat-messages">
                                            {
                                                publicChats.map((chat,index)=>(
                                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                                        {
                                                            chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>
                                                            }
                                                        <div className="message-data">{chat.message}</div>
                                                        {
                                                            chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                        
                                        <div className="send-message">
                                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                                            <button type="button" className="send-button" onClick={sendPublicValue}>⮚</button>
                                        </div>
                                    </div>
                                }
                                {
                                    tab!=="CHATROOM" && <div className="chat-content">
                                        <ul className="chat-messages">
                                        {
                                                [...privateChats.get(tab)].map((chat,index)=>(
                                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                                        {
                                                            chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>
                                                        }
                                                        <div className="message-data">{chat.message}</div>
                                                        {
                                                            chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>
                                                        }
                                                    </li>   
                                                ))
                                            }
                                        </ul>
                        
                                        <div className="send-message">
                                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                                            <button type="button" className="send-button" onClick={sendPrivateValue}>⮚</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export  { MainPage }
