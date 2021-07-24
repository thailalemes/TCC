import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logonovo.png';


export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [protocol, setProtocol] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    const userCpf = localStorage.getItem('userCpf');

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
                history.push('/profile');
            } catch (err){
                alert ('Erro ao cadastrar caso, tente novamente.')
            }

        }

    return (
    <div className="new-incident-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Prefeitura de Araras" />
                <h1>Cadastrar ocorrência</h1>
                <p>Descreva o caso detalhadamente para que possamos analisá-lo.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Voltar para home
                    </Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Título da ocorrência" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Número do protocolo" 
                    value={protocol}
                    onChange={e => setProtocol(e.target.value)}
                    />
                    <input 
                    placeholder="Valor da multa em reais (caso houver)" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                    <p>ATENÇÃO: Para retirada de multas, favor anexar foto da notificação recebida.</p>
                    <input type='file' accept='image/*' id='file-input' style={{ height: 30}}/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
        );
}