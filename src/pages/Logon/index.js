import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from'../../services/api';

import './styles.css';
import Img from '../../assets/coleta.png';
import logoImg from '../../assets/logonovo.png';



export default function Logon(){
    const [cpf, setCpf] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { cpf });

                localStorage.setItem('userCpf', cpf);
                localStorage.setItem('userName', response.data.name);

                history.push('/profile');
            } catch (err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
        <section className="form">
            <div className="logoImg">

            <img src={logoImg} alt="Prefeitura de Araras" />
            </div>
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>

                <input placeholder="Seu CPF" 
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#228B22" />
                    Não tenho cadastro
                    </Link>
            </form>
        </section>

        <img src={Img} alt="Coleta" />
        
        </div>
    
        
    );
}