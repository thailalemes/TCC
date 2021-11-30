import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from'../../services/api';

import './styles.css';
import logoImg from '../../assets/logonovo.png';


export default function Welcome(){
    const [welcome, setWelcome] = useState('');
    const history = useHistory();

    async function handleWelcome(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { welcome });
            localStorage.setItem('userChoice', response.data);

                history.push('/welcome');
            } catch (err){
            alert('Falha na requisição, tente novamente.');
        }
    }

    return(
        <div className="welcome-container">
            <section className="form">
                <section>
                <div className="logoImg">

                <img src={logoImg} alt="Collect It" />
                </div>

                <form onChange={handleWelcome}>
                    <h1>Bem-vindo!</h1>
                    <h2>Selecione uma das opções</h2>
                    <Link className="button" onChange={e => setWelcome(e.target.value)} type="button" to="/logon-admin">Área Administrador</Link>
                    <Link className="button" onChange={e => setWelcome(e.target.value)} type="button" to="/logon-client">Área Cliente</Link>
                </form>
            </section>
             </section>
        
        </div>
    
        
    );

}