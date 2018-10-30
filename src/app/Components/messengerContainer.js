import { connectWithLifecycle } from 'react-lifecycle-component'
import { connectWebSocket, sendWebSocket } from "./../Actions/dispatchers";
import { MessengerComponent } from "./"



let mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
        websocket: state.websocket.payload,
        websocketEvents: state.websocketEvents.payload,
        websocketStatus: state.websocket.status
    }
}

let mergeProps = (state, dispatchProps, ownprops) => {
    const { dispatch } = dispatchProps
    return {
        ...state,
        componentDidMount: () => {
            let currentWindow = electron ? electron.remote.getCurrentWindow() : { wssPort: 1337};
            // let CEH_WSS = 'ws://localhost:30987/?_id=sayedn&_connType=Shell&scale=OFF';
            let CEH_WSS = 'wss://dit.ceh.messenger.adpcorp.com/?_id=sayedn&_connType=Shell&scale=OFF';
            dispatch(connectWebSocket({name: "server", address: `${CEH_WSS}`}));
            dispatch(connectWebSocket({name: "local", address: `ws://localhost:${currentWindow.wssPort}`}));
        },
        getDerivedStateFromProps: (props, state) => {
            console.log('getDerivedStateFromProps', props, state);
        },
        componentWillReceiveProps : (nextProps) => {
            console.log('componentWillReceiveProps', nextProps);
            const payload  = nextProps.websocketEvents && nextProps.websocketEvents.payload || {};
            if (payload.subscription === 'SHELL') {
                dispatch(sendWebSocket({...payload, name: 'local'}))
            }
        } 
    }
}

export const MessengerContainer = connectWithLifecycle(mapStateToProps, null, mergeProps)(MessengerComponent);