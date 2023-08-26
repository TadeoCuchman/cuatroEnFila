import { useState } from 'react';
import './ChooseNameModal.css'

function ChooseNameModal({ isOpen, onSubmit, setPlayers, players, waiting }) {
  const [name, setName] = useState(players[1].name)
  const invitedUrl = sessionStorage.getItem("actualGameLink")
  const [copied, setCopied] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    players[1].name = name;
    setPlayers(players)
    onSubmit(name);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-overlay"></div>
      {waiting ? 
      <div className="modal-content">
      <p style={{fontSize: '2rem'}}>WAITNG...</p> 
      <span>Url:</span>
      <p> {invitedUrl}
        <button style={{margin:'20px', height: 'auto', border: 'none'}} onClick={(event) => {
          event.preventDefault();
          if (navigator.clipboard && !copied) {
            navigator.clipboard.writeText(invitedUrl);
            event.target.style.backgroundColor = 'green';
            // // console.log(event.target.style.backgroundColor) 
            setCopied(true)
            setTimeout(() => {
              event.target.style.backgroundColor = '';
              // // console.log(event.target.style.backgroundColor) 
              setCopied(false)
            }, 500)
          }
        }}> Copy and Send to a Friend</button>
        </p> 
      </div>:
        <div className="modal-content">
          <h2>Choose a name</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(event) => {
                setName(event.target.value);
              }} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      }
    </div>
  );
}

export default ChooseNameModal;