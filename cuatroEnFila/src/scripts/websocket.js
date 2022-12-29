export function init(){

    const socket = new WebSocket('ws://localhost:3000');
    
    
    socket.addEventListener('open', () => {
        socket.send('hello server!');
    
    })
    
    socket.addEventListener('message', (e) => {
        if(e.data[0] == 123){
            console.log('Message From Server: ', JSON.parse(e.data));
        } else {
            console.log('Message From Server: ', e.data);
            e.preventDefault()
            e.stopPropagation()
            console.log(document.getElementById(e.data).style.backgroundColor )
            if(document.getElementById(e.data).style.backgroundColor == 'brown'){

                document.getElementById(e.data).click()
            }

        }
    
    })

    document.getElementsByClassName('game')[0].addEventListener('click', (e) => {
        sendColumn(e.target.id % 8)
    })
    
    
    const sendColumn = (data) => {
        socket.send(JSON.stringify({column: data}));  
    }
}

  