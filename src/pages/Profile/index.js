import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logonovo.png';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const userCpf = localStorage.getItem('userCpf');
    const userName = localStorage.getItem('userName');

    useEffect(() =>  {
        api.get('profile', {
            headers: {
                Authorization: userCpf,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [userCpf]);

    async function handleDeleteIncident(cpf) {
        try{
            await api.delete(`incidents/${cpf}`, {
                headers:{
                    Authorization: userCpf,
                }
            });

            setIncidents(incidents.filter(incident => incident.cpf !== cpf));
        } catch (err){
            alert ('Erro ao deletar caso, tente novamente.')
        }
    }

    async function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Prefeitura de Araras" />
                <span>Bem vindo(a), {userName}!</span>

        <Link className="button" to="/incidents/new">
            Cadastrar ocorrência
        </Link>
        <Link className="button" to="/schedule/new">
            Cadastrar agendamento
        </Link>
        <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#228B22" />
        </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.cpf}>
                    <strong>Ocorrência:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>Protocolo:</strong>
                    <p>{incident.protocol}</p>

                    <strong>Valor multa:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    </li>
                    ))}
            </ul>
        </div>

    )
}