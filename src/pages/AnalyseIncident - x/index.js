import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logoWhite.png';


export default function AnalyseIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [protocol, setProtocol] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    const userCpf = localStorage.getItem('userCpf');

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

        async function handleNewIncident(e){
            e.preventDefault();

            const data = {
                title,
                description,
                protocol,
                value,
            };

            try {
                await api.post('incidents', data, {
                    header:{
                        Authorization: userCpf,
                    }
                })
                history.push('/profile-adm');
            } catch (err){
                alert ('Erro ao cadastrar caso, tente novamente.')
            }

        }

    return (
    <div className="new-incident-container">
           <header>
                <img src={logoImg} alt="Collect It" />

                <Link className="back-link" to="/profile-adm">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Voltar para home
                    </Link>
                    </header>
                    <h1>Analisar ocorrência</h1>

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

                    <button onClick={() => handleDeleteIncident(incident.cpf)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    </li>
                    ))}
            </ul>
            </div>
        );
}