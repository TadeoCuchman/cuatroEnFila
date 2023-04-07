import { useState } from 'react';
import './ChooseNameModal.css'

function ChooseNameModal({ isOpen, onSubmit, setPlayers, players, waiting }) {
  const [name, setName] = useState(players[1].name)
  const handleSubmit = (event) => {
    event.preventDefault();
    players[1].name = name;
    setPlayers(players)
    onSubmit(name);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-overlay"></div>
      {waiting ? <p className="modal-content">WAITNG...</p> :
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