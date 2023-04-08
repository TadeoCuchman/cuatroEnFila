import React, { useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import { useLocation } from "react-router-dom";


const init = (setWaiting, setPlayers, players, invited, size, setIsAllowed) => {
    const location = useLocation();

    useEffect(()=> {
        const searchParams = new URLSearchParams(location.search);
        const contextParam = searchParams.get('context');

        const posibleId = JSON.parse(localStorage.getItem('FourInRowGame'))?.id;
        console.log('context from websocket', contextParam)
        const socket = new W3CWebSocket('ws://localhost:3000/' + '?context=' + contextParam + '&id=' + posibleId );    
        
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({type: 'newPlayer', playerName: invited ? players[1] : players[0]}))
        })
    
        
        
        socket.addEventListener('message', (e) => {
            const data = JSON.parse(e.data)

            if(!data.waiting){
                setWaiting(false)
            }else if (data.waiting == true){
                console.log(data)
                setIsAllowed(true)
                localStorage.setItem('FourInRowGame', JSON.stringify({id:data.id, context:contextParam}));                
            }

            if(data.type === 'id'){
                console.log(data.id)
                localStorage.setItem('FourInRowGame', JSON.stringify({id:data.id, context:contextParam}));                
                // localStorage.removeItem('FourInRowGameId');
            }

            if(data.namesCheck){
                setPlayers([
                    {
                      index: 0,
                      name: data.names[0].name.name,
                      id: data.names[0].name.id
                    },
                    {
                      index: 1,
                      name: data.names[1].name.name,
                      id: data.names[1].name.id
                    },
                ]);
            }


            //make the play of the other player
            if(data.type == 'column'){
                if(document.getElementById(data.column).style.backgroundColor == 'brown'
                 && data.id == data.turn){
                     setIsAllowed(true);
                     setTimeout(() => {
                        document.getElementById(data.column).click();
                     }, 10)
                }
            }
        })
    
        socket.addEventListener('close', () => {
            socket.send('Closed server!');
        })
    
        
        document.getElementsByClassName('game')[0].addEventListener('click', (e) => {
            const isAllowed = e.target.getAttribute("data-isallowed")
            console.log(isAllowed)
            if(e.isTrusted && isAllowed == 'true') {
                sendState('column', e.target.id % size);
                setTimeout(()=>{
                    setIsAllowed(false);
                },10)
            }
        })
        
        
        const sendState = (type, data) => {
            socket.send(JSON.stringify({type: type, state: data}));  
        }
        

    },[])    

}

export default init;