import React from 'react';
import { OnlineStatus } from "./onlinestatus.jsx";

import { Breath } from "./../breath.jsx";
export const Header = (props) => (
    
    <div className={"header"}>
        <div className="ceh-logo">&nbsp;</div>
        <Breath {...props}/>
        {/* <OnlineStatus {...props} /> */}
    </div>
)