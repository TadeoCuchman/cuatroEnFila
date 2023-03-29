import { useState } from 'react';
import './ChooseNameModal.css'

function ChooseNameModal({ isOpen, onClose, onSubmit, setPlayers, players, waiting }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      {waiting ? <p className="modal-content">WAITNG...</p> :
        <div className="modal-content">
          <h2>Choose a name</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(event) => setPlayers(...players,{index: 0,name: event.target.value})} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      }
    </div>
  );
}

export default ChooseNameModal;