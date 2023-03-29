
const Html5WebSocket = require('html5-websocket');
const ReconnectingWebSocket = require('reconnecting-websocket');


//initialization

let ws_host = 'localhost';
let ws_port = '3000';
const options = { WebSocket: Html5WebSocket };
const rws = new ReconnectingWebSocket('ws://' + ws_host + ':' + ws_port + '/ws', undefined, options);
rws.timeout = 1000;

let orderOfColumns = [];

rws.addEventListener('open', () => {
    console.log('[Client] connected to '+ ws_host + ':' + ws_port);
    rws.send('Hello, this is a message from a client');
    rws.send(JSON.stringify({
        method: 'set-background-color',
        params:{
            color:'blue'
        }
    }));
    rws.send(JSON.stringify({
        method:'receiveColumn',
        params:{column: 4}
    }))
})

rws.addEventListener('message', (e) => {
    console.log('[Client] Message received: ' + e.data);
    try{
        let m = JSON.parse(e.data)
        handleMessage(m);
        
    }catch(e){
        console.log('[Client] Error parsing message: ' + e);

    }
})


rws.addEventListener('close', () => {
    console.log('[Client] Connection closed');
})

rws.onerror = (e) => {
    if(e.code = 'EHOSTDOWN'){
        console.log('[Client] server is down');
    }
}

//handlers

let handlers = {
    "set-background-color": (m) => {
        console.log('[Client] set-background-color handler');
        console.log('[Client] Color is ' + m.params.color);

    },
    "receiveColumn" : (m) => {
        console.log(m.params.column);
        console.log('[Client] new box putted on column ' + m.params.column + ' all collumns: ' + orderOfColumns);
    }
}

function handleMessage(m) {
    if(m.method == undefined){
        return;
    }
    let method = m.method;

    if(handlers[method]){
        let handler = handlers[method]
        handler(m);

    } else {
        console.log('[Client] Unhandled method' + method);

    }
}
