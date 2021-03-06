import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';


export default function Register() {
    const [name, setName] = useState('');
    const [year, setEmail] = useState('');


    const history = useHistory();
    const userId = localStorage.getItem('userId');

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            year
        };

        try {
            const response = await api.post('machine', data, { headers:{Authorization: userId} });
            history.push('/menu');
        } catch (err) {
            alert('Erro no cadastro tente novamente!')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    

                    <h1>Cadastro</h1>
                    <p>cadastro de maquina</p>

                    <Link className="back-link" to="/menu">
                        <FiArrowLeft size={16} color="#E02041" />
                        ja cadastrei
                    </Link>

                </section>
                <form onSubmit={handleRegister}>

                    <input placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input type="Ano" placeholder="Ano"
                        value={year}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}