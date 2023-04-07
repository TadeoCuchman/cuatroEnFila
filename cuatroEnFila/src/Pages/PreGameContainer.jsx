import React, {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ChooseNameModal from '../Components/ChooseNameModal';



const PreGameContainer = ({players, setPlayers}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [context, setContext] = useState(searchParams.get('context'));

  const isOpenModal = () => {
    
    }

    const onSubmitModal = (name) => {
        navigate(`/Game?context=${context}`);

    }

    return (
        <div>
            <ChooseNameModal isOpen={isOpenModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={false} /> 
        </div>
    );
};

export default PreGameContainer;