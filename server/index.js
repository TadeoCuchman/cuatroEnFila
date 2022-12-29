const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const server = express().listen(3000);

const wss = new SocketServer({server});

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', (ws) => {

    console.log('[Server] a client was connected');
    ws.id = wss.getUniqueID();

    ws.send('Welcome new client! Your Id is ' + ws.id);


    ws.on('close', () => {console.log('[Server] a client disconected')})

    ws.on('message', (data) => {
        console.log('[Server] data was recieved: ' + data + ' by '+ ws.id);
        
        if(data[0] === 123) {
            const parsedData = JSON.parse(data);
            wss.clients.forEach( function each(client) {
                if(client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(parsedData.column);
                }
            })     
        }
        
    });

    ws.on('error', (err) => {        

        wss.clients.forEach( function each(client) {
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);

            }
        })

    })
})

