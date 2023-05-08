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
    backgroundColor: 'rgba(14, 192, 136, 0.791)',
    width: '300px',
    height: '200px'
  }
}


const Modal = ({error, setError, winner, setWinner, setModal, webWinner, mode, setPlayers}) => {
    
    useEffect(() => {
      if(error){
        setTimeout(() => {
          setError('')
          setModal(false)
        },[1000])
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
                <button id="goHome">
                  Go home 
                </button>
              </Link>
              <button id="playAgain" data-winnerid={webWinner.id} onClick={() => {
                setWinner('')
                setModal(false)
                setPlayers([
                  {
                    index: 0,
                    name: "Player"
                  },
                  {
                    index: 1,
                    name: "Player2",
                  },
              ])
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