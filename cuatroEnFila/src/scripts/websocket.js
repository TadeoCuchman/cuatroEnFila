import React, { useEffect, useState } from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import { useLocation } from "react-router-dom";


const init = (player, setWaiting, setPlayers, players, setInvited, invited ) => {
    const location = useLocation();

    useEffect(()=> {
        const searchParams = new URLSearchParams(location.search);
        const contextParam = searchParams.get('context');
        const invitedParam = searchParams.get('invited');
        // setTimeout(()=> {
        //   if(invitedParam == 'true'){
        //     setInvited(true);
        //   }
        // },[1000])

        console.log(invited)

        console.log('context from websocket', contextParam)
        const socket = new W3CWebSocket('ws://localhost:3000/' + contextParam);    
        
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({state: 'newPlayer', playerName: player}))
            console.log('connect', socket.url)
    
        })
    
        
        
        socket.addEventListener('message', (e) => {
            const data = JSON.parse(e.data)
            console.log(data)

            if(!data.waiting){
                setWaiting(false)
            }

            if(data.namesCheck){
                console.log(data.names[0].name)
                // setPlayers({
                //     index: 0,
                //     name: data.names[0].name
                //   },
                //   {
                //     index: 1,
                //     name: data.names[1].name
                //   },)
            }
        
            // if(e.data[0] == 123){
            //     console.log('Message From Server1: ', JSON.parse(e.data));
            // } else if (e.data[0] == 'W'){
            //     console.log('Message From Server2: ', JSON.stringify(e.data));
    
            // }
            // else {
            //     console.log('Message From Server3: ', e.data);
            //     const parsedData = JSON.parse(e.data)
            //     console.log(parsedData)
    
            //     //cambia nombres de los jugadores en el juego
            //     if(parsedData.names){
            //         document.getElementById('player1').innerText = parsedData.names[0]
            //         document.getElementById('player2').innerText = parsedData.names[1]
            //     }
    
            //     //genera el click del otro jugador
            //     console.log(parsedData.turn)
            //     if(document.getElementById(parsedData.column).style.backgroundColor === 'brown' && parsedData.turn == true ){
            //         document.getElementById(parsedData.column).click()
            //     }else{
            //         document.getElementsByClassName('game')[0].style.pointerEvents = "none";
            //     }
            // }
    
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