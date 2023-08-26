import { useEffect } from "react"
import { Link } from "react-router-dom"

const style = {
  error: {
    backgroundColor: 'rgba(133, 39, 39, 0.301)',
    width: '300px',
    height: '50px',
    textAlign: 'center',
    paddingTop: '10px',


  },
  success: {
    boxShadow: ' 0 1px 2px rgba(0,0,0,.2)',
    border: 'none',
    backgroundColor: ' rgba(130, 3, 130, 0.683)',
    width: '300px',
    height: '200px'
  }
}


const Modal = ({ error, setError, winner, setWinner, setModal, webWinner, mode, setPlayers }) => {

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
        setModal(false)
      }, [1000])
    }
  }, [])



  return (
    <div className="modalContainer">
      <div className="modal2" style={error ? style.error : style.success}>
        {error && <div className="error" style={style.error}>{error}</div>}
        {winner &&
          <>
            <div className="success" data-winners={webWinner.id}>The Winner is: {webWinner.name}!!</div>
            <Link to='/'>
              <button id="goHome" onClick={() => {
                setPlayers([
                  {
                    index: 0,
                    name: "Player",
                    winCount: 0,
                    firstTurn: true
                  },
                  {
                    index: 1,
                    name: "Player2",
                    winCount: 0,
                    firstTurn: false
                  },
                ])
              }}>
                Go home
              </button>
            </Link>
            <button id="playAgain" data-winnerid={webWinner.id} onClick={() => {
              setWinner('')
              setModal(false)
              if (mode === 'Invite a Friend') {
                setPlayers([
                  {
                    index: 0,
                    name: "Player",
                    winCount: 0,
                    firstTurn: true
                  },
                  {
                    index: 1,
                    name: "Player2",
                    winCount: 0,
                    firstTurn: false
                  },
                ])
              }
            }}>
              Play Again
            </button>

          </>
        }
      </div>
      <div className="success"></div>
    </div>
  )
}

export default Modal