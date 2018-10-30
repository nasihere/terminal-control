import React from 'react';

export const OnlineStatus = (props) => {
    const status = props.websocketStatus ? 'Connected' : 'Retrying...';
    return (
        <span className={'status'}>{status}</span>
       
    )
}