import { useEffect } from "react"

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


const Modal = ({error, setError, winner, createBoard, setTurn, setWinner, setModal}) => {
    
    useEffect(() => {
      if(error){
        setTimeout(() => {
          setError('')
          setModal(false)
        },[1500])
      }
    }, [])

  

    return (
        <div className="modal" style={error ? style.error : style.success}>
            {error && <div className="error" style={style.error}>{error}</div>}
            {winner && 
            <>
              <div className="success">The Winner is: {winner}!!</div>
              <button onClick={()=> {
                createBoard([])
                setWinner('')
                setTurn(0)
                setModal(false)
              }}>Play Again</button>
              <button onClick={()=> {
                  window.location.reload();
              }}>
                Choose Players 
              </button>
              
            </>
            }
        </div>
    )
}

export default Modal