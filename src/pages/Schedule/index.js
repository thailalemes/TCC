import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logonovo.png';
import api from '../../services/api';

export default function Schedule(){
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const userCpf = localStorage.getItem('userCpf');

    async function handleNewSchedule(e) {
        e.preventDefault();

        const data = {
            title,
            date,
        };

        try {
            await api.post('schedule', data, {
                headers: {
                    Authorization: userCpf,
                }
            })

            history.push('profile-client')
        } catch (err) {
            alert('Erro ao agendar, tente novamente.')
        }
    }

        return (
        <div className="new-schedule-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Collect It" />
                <h1>Agendar Coleta</h1>
                <p>Informe qual a data desejada e agende sua coleta.</p>

                <Link className="back-link" to="/profile-client">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Voltar para home
                    </Link>

                </section>
                <form onSubmit={handleNewSchedule}>
                    <p>ATENÇÃO: Para que não haja atrasos, favor agendar com no mínimo 1 dia de antescedência. Não agendar em domingos e feriados.</p>
                        <select id="cbores">
                        <option value=""></option>
                        <option 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        >Entulho
                        </option>
                        </select>
                        <input id='date' 
                        type='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        placeholder="Escolha uma data" />

                        <button className="button" type="submit">Agendar</button>
                </form>

            </div>
        </div>
        );
    }