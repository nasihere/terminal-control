import React from 'react';

export const Breath = (props) => {
    const classBreath = props.websocketStatus ? 'breathing' : 'breathing bgRed'; 
    return (
    
    <div className={"breathBox"}>
        <div className={classBreath}>
        </div>
    </div>
)}