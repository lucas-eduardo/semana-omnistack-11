import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.css';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data: { name } } = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logo-container">
      <section className="form">
        <img className="logo" src={logoImg} alt="Be The Hero"/>

        <form noValidate autoComplete="off" onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
          <button className="button" type="submit" disabled={!id}>Entrar</button>

          <Link className="back-link" to="/register"><FiLogIn size={16} color="#e02041" /> Não tenho cadastro</Link>
        </form>
      </section>

      <img className="heroes" src={heroesImg} alt="Heroes"/>
    </div>
  );
}
