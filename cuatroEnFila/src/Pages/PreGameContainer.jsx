import React, {useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ChooseNameModal from '../Components/ChooseNameModal';



const PreGameContainer = ({players, setPlayers, setMode}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const context = searchParams.get('context');
    const size = searchParams.get('size')
    const isOpenModal = () => {
        
        }
    
    useEffect(() => {
        setMode('Invite a friend')
    },[])

    const onSubmitModal = (name) => {
        navigate(`/Game?context=${context}&size=${size}`);

    }

    return (
        <div>
            <ChooseNameModal isOpen={isOpenModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={false} /> 
        </div>
    );
};

export default PreGameContainer;