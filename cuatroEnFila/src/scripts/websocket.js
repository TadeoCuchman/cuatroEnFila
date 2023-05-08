import React, { useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import { useLocation } from "react-router-dom";


const init = (setWaiting, setPlayers, players, invited, size, setIsAllowed, setGamesCount) => {
    const location = useLocation();

    useEffect(()=> {
        const searchParams = new URLSearchParams(location.search);
        const contextParam = searchParams.get('context');

        const posibleId = JSON.parse(localStorage.getItem('FourInRowGame'))?.id;
        const socket = new W3CWebSocket('wss://websocketserver-9e8x.onrender.com' + '?context=' + contextParam + '&id=' + posibleId );    
        console.log('context from websocket', contextParam)
        console.log('context from websocket', socket)
        
        socket.addEventListener('open', (req, res) => {
            console.log(req, res)
            console.log('socket', socket)
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
                      id: data.names[0].id
                    },
                    {
                      index: 1,
                      name: data.names[1].name.name,
                      id: data.names[1].id
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

            if(data.type == 'newSameGame'){

                console.log(data)
                console.log('myid',JSON.parse(localStorage.getItem('FourInRowGame')).id)
                if(data.turn == JSON.parse(localStorage.getItem('FourInRowGame')).id){
                    setIsAllowed(true)
                } else {
                    setIsAllowed(false)
                }
                setGamesCount({player1: data.info.player1.count, player2:data.info.player2.count})
                if(data.ready == true) {
                    setWaiting(false);
                }else {
                    setWaiting(true)
                }

            }
        })
    
        socket.addEventListener('close', () => {
            socket.send('Closed server!');
        })
    
        //game listener
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



        // const targetNode = document.body;
        // console.log(targetNode)
        // const observer = new MutationObserver(function(mutationsList, observer) {
        //     for(let mutation of mutationsList) {
        //         console.log(mutation)
        //         if (mutation.type === 'childList') {
        //             for(let node of mutation.addedNodes) {
        //                 if(node.class === 'success') {
        //                     console.log('node',node)
        //                     // code to access the element here
        //                     console.log(node)
        //                     observer.disconnect(); // stop observing changes
        //                 }
        //             }
        //         }
        //     }
        // });
        // observer.observe(targetNode, { childList: true });

        // Monitor the value of myVariable
        // setInterval(function() {
        //     console.log('myVariable:', winner);
        // }, 1000); // Check the value of myVariable every second





        //listener for unrendered elements
        document.addEventListener( "click", someListener );

        function someListener(event){
            var element = event.target;
            // console.log(element);
            if(element.id == 'goHome'){
                socket.close(1000, 'Closing from client');
            }
            if(element.id == 'playAgain'){
                sendState('playAgain', {nextFirstId: element.getAttribute('data-winnerid')})
            }
        }
        

        
        const sendState = (type, data) => {
            socket.send(JSON.stringify({type: type, state: data}));  
        }
        

    },[])    

}

export default init;