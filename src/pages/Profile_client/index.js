import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import 'leaflet/dist/leaflet.css' 

import logoImg2 from '../../assets/logoWhite.png';

export default function ProfileClient(){

    const [schedule, setSchedule] = useState([]);
    const [address, setAddress] = useState('');

    const history = useHistory();

    const userCpf = localStorage.getItem('userCpf');
    const userName = localStorage.getItem('userName');

    useEffect(() =>  {
        api.get('profile-client', {
            headers: {
                Authorization: userCpf,
            }
        }).then(response => {
            setSchedule(response.data);
        })
    }, [userCpf]);

    useEffect(() =>  {
        api.get('profile-client', {
            headers: {
                Authorization: userCpf,
            }
        }).then(response => {
            setAddress(response.data.address);
        })
    }, [userCpf]);

    async function handleDeleteSchedule(id) {
        try{
            await api.delete(`schedule/${id}`, {
                headers:{
                    Authorization: userCpf,
                }
            });

            setSchedule(schedule.filter(schedule => schedule.id !== id));
        } catch (err){
            alert ('Erro ao deletar agendamento, tente novamente.')
        }
    }

    async function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg2} alt="CollectIt" />
                <span>Bem vindo(a), {userName}!</span>

                <Link className="button" to="/schedule">
                    Agendar Coleta
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#228B22" />
                </button>
            </header>
            <body>
                <h1>Histórico de agendamentos</h1>

                <ul>
                    {schedule.map(schedule => (
                    <li key={schedule.cpf}>
                        <strong>Tipo de resíduo:</strong>
                        <p>Entulho{schedule.title}</p>

                        <strong>Data:</strong>
                        <p>{schedule.date}</p>

                        <button onClick={() => handleDeleteSchedule(schedule.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        </li>
                    ))}
            </ul>
            </body>
        </div>

    )
}