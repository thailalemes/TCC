import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logonovo.png';

export default function NewSchedule(){

return (
<div className="new-schedule-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Prefeitura de Araras" />
                <h1>Agendar coleta</h1>
                <p>Informe qual a melhor data para sua coleta e o tipo de resíduo a ser recolhido.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Voltar para home
                    </Link>

                </section>
                <form>
                    <p>ATENÇÃO: Para que não haja atrasos, favor efetuar o agendamento com no mínimo um dia de antescedência.</p>
                        <select id="cbores">
                        <option value=""></option>
                            <option value="trash">Resíduos comuns</option>
                                 <option value="ent">Entulho</option>
                        </select>
                        <input id='date' type='date' placeholder="Escolha uma data" />

                            <button className="button" type="submit">Agendar</button>
                </form>

            </div>
        </div>
        );
    }