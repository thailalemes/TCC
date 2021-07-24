import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logonovo.png';

export default function Register(){
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereço, setEndereço] = useState('');
    const [bairro, setBairro] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            cpf,
            email,
            telefone,
            endereço,
            bairro,

        };
try{
        const response = await api.post('users', data);
        alert(`Cadastro realizado com sucesso! ${response.data}`);

        history.push('/');
} catch (err){
    alert ('Erro no cadastro, tente novamente.');
}

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Prefeitura de Araras" />
                <h1>Cadastro</h1>
                <p>Faça seu cadastro e ajude a Prefeitura com a coleta diária de resíduos.</p>

                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Já possuo cadastro
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Seu nome" 
                    value={name}
                    onChange={e=> setName(e.target.value)} 
                    />

                    <input placeholder="CPF" 
                    value={cpf}
                    onChange={e=> setCpf(e.target.value)}
                    />

                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    />

                    <input placeholder="Telefone" 
                    value={telefone}
                    onChange={e=> setTelefone(e.target.value)}
                    />

                    <div className="input-group">
                    <input placeholder="Endereço" 
                    value={endereço}
                    onChange={e=> setEndereço(e.target.value)}
                    />

                    <input placeholder="Bairro" 
                    value={bairro}
                    onChange={e=> setBairro(e.target.value)}
                    />

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>

    );
}