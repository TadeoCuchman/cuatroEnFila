const express = require('express');
const { client } = require('websocket');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
var url = require("url");

const server = express().listen(3000);
const wss = new SocketServer({server});
const clients = {};

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

function deleteWsById(set, id) {
    set.forEach((obj) => {
        if (obj.id === id) {
        set.delete(obj);
        }
    });
}

function deleteContextByContext(context) {
    for (const client in clients) {
      if (clients.hasOwnProperty(context)) {
        if (client === context) {
            clients[context].forEach((client) => {
                client.close()
            })
          delete clients[context];
          return;
        }
      }
    }
}

wss.on('connection', (ws, req) => {
    console.log('clientsContextsFirst',Object.keys(clients));
    var parsedUrl = url.parse(req.url, true);
    var queryAsObject = parsedUrl.query;
    // console.log('context', queryAsObject.context);
    // console.log('id', queryAsObject.id);
    
    const key = req.headers['sec-websocket-key'];
    console.log('new connection : ' + key)
    const context = queryAsObject.context;
    const id = queryAsObject.id;
    console.log('first clients of context',clients[context])
    
    let foundClient = null;
    if(clients[context]){
        clients[context].forEach((client) => {
        console.log('clientid',client.id)
        if (client.id === id) {
            foundClient = client;
        }
        });
    }
    console.log('foundClient', foundClient)

    if(foundClient == null){
        ws.id = wss.getUniqueID();
        
        
        // If the context is not in the dictionary, create a new set of connected players
        if (!clients[context]) {
            clients[context] = new Set();
        }
        
        // If the number of connected players in this context is already 2, reject the connection
        if (clients[context].size >= 2) {
            if(!clients[context].has(ws)){
                ws.close();
                return;
            }
        } else {
            clients[context].add(ws);
        }
        console.log('clientsContexts',Object.keys(clients));
                
        if(clients[context].size == 1){
            clients[context].turn = ws.id;
            clients[context].counter = [];
            ws.send(JSON.stringify({message: 'Welcome new client! Your Id is ' + ws.id + '. We are waiting for player 2', id: ws.id, waiting : true}))
        } else {
            ws.send(JSON.stringify({type: 'id', id: ws.id}))
            // const matrix = Array(8).fill().map(() => Array(8).fill(0));
            // let wsIds = []
            // clients[context].forEach((client)=>{
            //     wsIds.push(client.id)
            // })
            // clients[context].forEach((client)=>{
            //     // console.log(client)
            //     client.send(JSON.stringify({data : {
            //         state: matrix,
            //         client: wsIds,
            //         turn: clients[context].turn
            //     }}))
            // })
        }
    } else {
        ws.send(JSON.stringify({message: 'Welcome Back', id: ws.id}))

    }
    


    ws.on('message', (data) => {
        console.log('[Server] Message received: ' + data + ' by '+ ws.id);
        console.log('client size', clients[context].size);

        //when players connect to the game in order to recieve their names
        const dataJson = JSON.parse(data)
        if(dataJson.type == "newPlayer"){
            // Assume we have a WebSocket connection object called ws and a context called "myContext"
            //add name to client
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
                // console.log(clientsNames)
                clients[context].forEach((client)=>{
                    client.send(JSON.stringify({state:'Names', names:clientsNames, namesCheck:true, turn: clients[context].turn}))
                })
            }
        }

        //send column of other player
        if(dataJson.type == 'column' && clients[context].turn == ws.id){
            clients[context].forEach((client)=>{
                if(client.id != ws.id){
                    // console.log(client)
                    client.send(JSON.stringify({
                        type:'column',
                        id: ws.id, 
                        column: dataJson.state,
                        turn: clients[context].turn
                    }))
                    clients[context].turn = client.id;
                }
        
            })
        }

        if(dataJson.type == 'playAgain'){
            for (let obj of clients[context]) {
            if (obj.id == dataJson.state.nextFirstId && ws.id == obj.id) {
                obj.counter ? obj.counter = obj.counter + 1 : obj.counter = 1;
                break;
            }
            }
            clients[context].turn = dataJson.state.nextFirstId;
  

            let interClients = {player1:{id: '', counter:''}, player2:{id: '', counter:''}}
            clients[context].forEach((client) => {
                if(interClients.player1.id == ''){
                    interClients.player1.counter = client.counter;
                    interClients.player1.id = client.id;
                }
                if(interClients.player1.id != ''){
                    interClients.player2.counter = client.counter;
                    interClients.player2.id = client.id;
                }
            })

            clients[context].forEach((client) => {
                client.send(JSON.stringify({type: 'newSameGame', turn: clients[context].turn, info: {player1:{id: interClients.player1.id, count: interClients.player1.counter}, player2:{id: interClients.player2.id, count: interClients.player2.counter}},ready: clients[context].ready}))
            })
            

            clients[context].ready = true;
            


            console.log(clients[context].ready)
        }

    });
    

    ws.on('close', function close() {
        console.log('WebSocket connection closed for context:', context);
        // Remove the WebSocket connection from the clients object for the given context
        if(clients.hasOwnProperty(context)) {
            //remove client of context set when he leave
            if(clients[context].size > 0) {
                clients[context].forEach((client) => {
                    if(client.id == ws.id){
                        clients[context].delete(client);
                    }
                })
            }
            if(clients[context].size == 0) {
                deleteContextByContext(context);
                ws.close(1000, 'Closing from server');
            }  
            // else if(clients[context].size == 1) {
            //     setTimeout(() => {
            //         deleteContextByContext(context);
            //         ws.close(1000, 'Closing from server');
            //     },30000)
            // }
        }
        console.log('clientsAfterClose',Object.keys(clients));
        console.log('clientsAfterClose',clients[context])

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

