import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import logoImg2 from '../../assets/logoWhite.png';

export default function ProfileAdm(){

    const [schedule, setSchedule] = useState([]);

    const history = useHistory();

    const userCpf = localStorage.getItem('userCpf');
    const userName = localStorage.getItem('userName');

    const containerStyle = {
        width: '1130px',
        height: '850px'
      };
      
      const centers = {
        lat: -22.21,
        lng: -47.23
      };

      const position = {
        lat: -22.21,
        lng: -47.23
      };

      const onLoad = marker => {
        console.log('marker: ', marker)
      }

    useEffect(() =>  {
        api.get('profile-adm', {
            headers: {
                Authorization: userCpf,
            }
        }).then(response => {
            setSchedule(response.data);
        })
    }, [userCpf]);

    async function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg2} alt="CollectIt" />
                <span>Bem vindo(a), Thaila! {userName}</span>

                <Link className="button" to="/report">
                    Emitir Relatório
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#228B22" />
                </button>
            </header>
            <body>
                <h1>Agendamentos</h1>
               <LoadScript
                googleMapsApiKey="AIzaSyCqxJmocZKui0kmjiM_tGq_IVNcCqZNbdg"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centers}
                        zoom={10}
                    >
                      <Marker
                        onLoad={onLoad}
                        position={position}
                        />
                    </GoogleMap>
                </LoadScript>
            </body>
        </div>

    )
}