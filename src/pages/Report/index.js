import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logonovo.png';
import api from '../../services/api';
import emailjs from 'emailjs-com';

export default function NewReport(){
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [schedule, setSchedule] = useState([]);
    const userCpf = localStorage.getItem('userCpf');
    const form = useRef();

    /* const handleChange = (event) => {
        this.setState({value: event.target.value})
    } */

        useEffect(() =>  {
            api.get('users', {
                headers: {
                    Authorization: userCpf,
                }
            }).then(response => {
                setSchedule(response.data);
            })
        }, [userCpf]);

        
        function sendEmail(e) {
            e.preventDefault();

            emailjs.sendForm('service_hnikp3b', 'template_vh7pzvt', e.target, 'user_C9eFLQNdWBOlmwxDo8WCn')
            .then((result) => {
                window.location.reload()
                console.log('SUCCESS!', result.status, result.text);
                alert('Relatório enviado com sucesso!');
            }, (error) => {
                console.log('FAILED...', error);
                alert('Falha ao enviar relatório :/')
            });
        }

        var curr = new Date();
        curr.setDate(curr.getDate() + 1);
        var dates = curr.toISOString().substr(0,10);

        return (
        <div className="new-schedule-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Collect It" />
                <h1>Emitir Relatório</h1>
                <p>Informe qual a data desejada e emita o relatório de agendamentos.</p>

                <Link className="back-link" to="/profile-adm">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Voltar para home
                    </Link>

                </section>
                <form ref={form} onSubmit={sendEmail}>
                    <p>ATENÇÃO: Para que não haja atrasos junto a coleta, favor emitir o relatório com antescedência.</p>
                        <select id="cbores">
                        <option value=""></option>
                        <option  
                        value={title}
                        onChange={e => setTitle(e.target.value)}>Entulho</option>
                        </select>
                        <input 
                        id='date' 
                        defaultValue={dates}
                        type='date' 
                        onChange={e => setDate(e.target.value)} 
                        placeholder="Escolha uma data" />

                        <button className="button" type="submit">Emitir</button>
                </form>

            </div>
        </div>
        );
    }