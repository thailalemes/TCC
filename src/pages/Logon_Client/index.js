import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from'../../services/api';

import './styles.css';
import ImgCol from '../../assets/coleta_client.png';
import logoImg from '../../assets/logonovo.png';


export default function Logon_Client(){
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    // função para submeter o usuário ao sucesso ou falha no login
    async function handleLogin(e){
        e.preventDefault();
    // chama a api sessions se o login e senha estiveverem okay, envia para a tela de perfil
    // se não mostra mensagem falha no login
        try{
            const response = await api.post('sessions', { cpf, password });

                localStorage.setItem('userCpf', cpf);
                localStorage.setItem('userName', response.data.name);
                localStorage.setItem('userData', response);

                history.push('/profile-client');
            } catch (err){
            alert('Falha no login, tente novamente.');
        }
    }
    // retorna a tela do cliente
    return(
        <div className="logon-container">
        <section className="form">
            <div className="logoImg">

            <img src={logoImg} alt="Collect It" />
            </div>
            <form onSubmit={handleLogin}>
                <h1>Área do Cliente</h1>

                <input placeholder="Seu Login" 
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                />
                 <input type="password" placeholder="Sua senha" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register-client">
                    <FiLogIn size={16} color="#228B22" />
                    Não tenho cadastro
                    </Link>
            </form>
        </section>

        <img src={ImgCol} alt="Coleta2" />
        
        </div>
    
        
    );

}