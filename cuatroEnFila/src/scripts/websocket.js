import React, { useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import { useLocation } from "react-router-dom";


const init = (setWaiting, setPlayers, players, invited ) => {
    const location = useLocation();
    

    useEffect(()=> {
        console.log('players',players)
        const searchParams = new URLSearchParams(location.search);
        const contextParam = searchParams.get('context');

        console.log('context from websocket', contextParam)
        const socket = new W3CWebSocket('ws://localhost:3000/' + contextParam);    
        
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({state: 'newPlayer', playerName: invited ? players[1] : players[0]}))
        })
    
        
        
        socket.addEventListener('message', (e) => {
            const data = JSON.parse(e.data)
            console.log(data)

            if(!data.waiting){
                setWaiting(false)
            }

            if(data.namesCheck){
                console.log(data.names[0].name)
                setPlayers([
                    {
                      index: 0,
                      name: data.names[0].name.name
                    },
                    {
                      index: 1,
                      name: data.names[1].name.name,
                    },
                ]);
                console.log('despues',players)
            }

    
        })
    
        socket.addEventListener('close', () => {
            socket.send('Closed server!');
        })
    
        
        document.getElementsByClassName('game')[0].addEventListener('click', (e) => {
            sendState(e.target.id % 8)
        })
        
        
        const sendState = (data) => {
            socket.send(JSON.stringify({state: data}));  
        }
        

    },[])    

    

}

export default init;