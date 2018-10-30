let NO_CONNECTION = true
import { 
    WEBSOCKET_CONNECT, 
    WEBSOCKET_CONNECTED, 
    WEBSOCKET_DISCONNECTED, 
    WEBSOCKET_ERROR, 
    WEBSOCKET_RECEIVED, 
    WEBSOCKET_SEND, 
    WEBSOCKET_DISMISS,
    WEBSOCKET_EVENTS
  } from './../ActionTypes'


export function createWebsocketMiddleware() {
  const connections = {}
  return function (store) {

    return function (next) {
      return function (action) {
        if (!isSocketAction(action)) {
          return next(action)
        }
        else if (isSocketSend(action)) {
          return sendMessage(action)
        }
        if (action.type === WEBSOCKET_CONNECT && connections[action.payload.name] === undefined ) {

          setupSocket(action.payload.address, action.payload.name)

          return next(action)

        }
        next(action)
        
      }
    }
    function sendMessage(action) {
      console.log('sendMessage', action);
      const payload  = action && action.payload || {};
      try {
        connections[payload.name].socket.send(JSON.stringify(payload));
      }
      catch(ex) {
        store.dispatch({type: WEBSOCKET_ERROR, error: ex })
      }
    }
    function reConnect(endpoint) {
      if (document.hidden === true) {
        setTimeout(() => reConnect(endpoint), 5000);
      }
      else {
        setupSocket(endpoint);
      }
    }
    function setupSocket(endpoint, name='default') {
      const connection = {
        endpoint: endpoint,
        socket: new WebSocket(endpoint),
        queue: []
      }


      connection.socket.onmessage = function (data) {
        let action = createMessageAction(endpoint, data)
        if (action) store.dispatch(action)
      }

      connection.socket.onopen = function () {
        store.dispatch(createConnectionAction(endpoint))
      }

      connection.socket.onclose = function () {
       // store.dispatch(createDisonnectionAction(endpoint))

        setTimeout(() => reConnect(endpoint), 5000);

      }

      connection.socket.onerror = function (error) {
        console.debug('websocket-connection-onerror', `Failed to connect to websockets, URL: ${endpoint}`)
        //store.dispatch(createErrorAction(endpoint, error))
      }

      connections[name] = connection
      return connection
    }

    
  }
  function isSocketSend(action) {
    if (!action.type) return
    return Boolean(action && action.type) && [
      WEBSOCKET_SEND
  
    ].indexOf(action.type) > -1
  }
  function isSocketAction(action) {
    if (!action.type) return
    return Boolean(action && action.type) && [
      WEBSOCKET_CONNECT,
      WEBSOCKET_CONNECTED, 
      WEBSOCKET_DISCONNECTED, 
      WEBSOCKET_ERROR, 
      WEBSOCKET_RECEIVED, 
      WEBSOCKET_SEND, 
      WEBSOCKET_DISMISS,
      WEBSOCKET_EVENTS
  
    ].indexOf(action.type) > -1
  }
  
  function createConnectionAction(endpoint) {
    return {
      type: WEBSOCKET_CONNECTED,
      meta: {websocket: endpoint}
    }
  }
  
  
  function createMessageAction(endpoint, message) {
  
    const resJson = JSON.parse(message.data)
    if (resJson.status === 'connected') {
      return {
        type: WEBSOCKET_CONNECTED,
        payload: resJson,
        meta: {websocket: endpoint}
      }
    }
    else if (resJson.status === 'close') {
      return {
        type: WEBSOCKET_DISCONNECTED,
        payload: resJson,
        meta: {websocket: endpoint}
      }
    }
    else if (resJson.status !== undefined && resJson.status !== 200) {
      return {
        type: WEBSOCKET_ERROR,
        payload: resJson,
        meta: {websocket: endpoint}
      }
    }
    else {
      return {
        type: WEBSOCKET_EVENTS,
        payload: resJson,
        meta: {websocket: endpoint}
      }
    }
  }
  
  
  
  
  
}

