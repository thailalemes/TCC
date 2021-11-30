import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiUnlock } from 'react-icons/fi';

import api from'../../services/api';

import './styles.css';
import Imge from '../../assets/coleta.png';
import logoImg from '../../assets/logonovo.png';


export default function Logon_Admin(){
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { cpf, password });

                localStorage.setItem('userCpf', cpf);
                localStorage.setItem('userName', response.data.name);

                history.push('/profile-adm');
            } catch (err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
        <section className="form">
            <div className="logoImg">

            <img src={logoImg} alt="Collect It" />
            </div>
            <form onSubmit={handleLogin}>
                <h1>Área do Administrador</h1>

                <input placeholder="Seu Login" 
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                />
                 <input type="password" placeholder="Sua senha" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register-adm">
                    <FiLogIn size={16} color="#228B22" />
                    Não tenho cadastro
                    </Link>
            </form>
        </section>

        <img src={Imge} alt="Coleta" />
        
        </div>
    
        
    );

}