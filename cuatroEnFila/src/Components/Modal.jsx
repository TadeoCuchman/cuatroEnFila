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


const Modal = ({error, setError, winner, setModal}) => {
    
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
        <div className="modal" style={error ? style.error : style.success}>
            {error && <div className="error" style={style.error}>{error}</div>}
            {winner && 
            <>
              <div className="success">The Winner is: {winner}!!</div>
              <button id="closeModal" onClick={()=> {
                  window.location.reload();
              }}>
                Choose Players 
              </button>
              
            </>
            }
        </div>
        <div className="success"></div>
      </div>
    )
}

export default Modal