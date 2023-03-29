const express = require('express');
const { client } = require('websocket');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const server = express().listen(3000);
const wss = new SocketServer({server});
const clients = {};
const opponentNames = []
const turnId = []

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', (ws, req) => {
    ws.id = wss.getUniqueID();
    //console.log('remote access', req.socket.remoteAddress);

    const key = req.headers['sec-websocket-key'];
    console.log('new connection : ' + key)
    const context = req.url.slice(1);
    console.log('context : ' +  context)
    
    console.log('[Server] a client was connected to server : '  );
    // If the context is not in the dictionary, create a new set of connected players
    if (!clients[context]) {
        clients[context] = new Set();
    }
    
    // If the number of connected players in this context is already 2, reject the connection
    if (clients[context].size >= 2) {
        ws.close();
        return;
    }

    clients[context].add(ws);
    // console.log(clients[context])

    if(clients[context].size == 1){
        ws.send(JSON.stringify({message: 'Welcome new client! Your Id is ' + ws.id + '. We are waiting for player 2', id: ws.id, waiting : true}))
    } else {
        const matrix = Array(8).fill().map(() => Array(8).fill(0));
        let wsIds = []
        clients[context].forEach((client)=>{
            wsIds.push(client.id)
        })
        clients[context].forEach((client)=>{
            // console.log(client)
            client.send(JSON.stringify({data : {
                state: matrix,
                client: wsIds
            }}))
        })
    }


    ws.on('message', (data) => {
        console.log('[Server] Message received: ' + data + ' by '+ ws.id);

        const dataJson = JSON.parse(data)
        if(dataJson.state == "newPlayer"){
            // Assume we have a WebSocket connection object called ws and a context called "myContext"
            clients[context].forEach((client)=>{
                if (client === ws) {
                    // Modify the WebSocket connection object
                    client.name = dataJson.playerName;
                }
            })
            if(clients[context].size == 2){
                const clientsNames = []
                clients[context].forEach((client)=>{
                    const player = {id:client.id, name:client.name}
                    clientsNames.push(player);
                })
                console.log(clientsNames)
                ws.send(JSON.stringify({state:'Names', names:clientsNames, namesCheck:true}))
            }
        }

        // const opponentName = JSON.parse(data)

        // if(opponentNames.length < 2){
        //     opponentNames.push(opponentName.opponentName)
        //     if(opponentNames.length == 2) {
        //         turnId.push(clients[0].id)
        //         clients.forEach( function each(client) {
        //             if(client.readyState === WebSocket.OPEN) {
        //                 client.send(JSON.stringify({names:opponentNames}))
        //             }
        //         })
        //     }  
        // }
        // if(data[0] === 123) {
        //     const parsedData = JSON.parse(data);
        //     clients.forEach( function each(client) {
        //         if(client.id !== ws.id && client.readyState === WebSocket.OPEN) {
        //             client.send(JSON.stringify({
        //                 id: ws.id, 
        //                 column: parsedData.column, 
        //                 isFirst: clients[0].id == ws.id ? true: false,
        //                 opponentName:clients[0].id == ws.id  ? opponentNames[0] : opponentNames[1],
        //                 turn: ws.id == turnId[0] ? true : false
        //             }))
        //         }
        //     })  
            
        //     if(clients.length > 1){
        //         console.log(turnId, ws.id)
        //         turnId.pop()
        //         const turn = ws.id == clients[0].id ? clients[0].id : clients[1].id
        //         turnId.push(turn)
        //     }

        // }
        
    });
    

    ws.on('close', function close() {
        console.log('WebSocket connection closed for context:', context);
        // Remove the WebSocket connection from the clients object for the given context
        // clients[context] = clients[context].filter(function (client) {
        //   return client !== ws;
        // })
    })

    ws.on('error', (err) => {        

        wss.clients.forEach( function each(client) { 
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(err);
            }
        })
    })
    
}) 

wss.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
});

