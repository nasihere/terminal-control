import React from 'react';
import "./messenger.css";
import { Logs } from "./logs.jsx";
import { Header } from "./header/header.jsx";
export const MessengerComponent = (props) => (    
        <div className="container">
            <Header {...props}/>
            
            <Logs {...props} />
        </div>
)


