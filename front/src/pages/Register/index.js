import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const { data: { id } } = await api.post('/ongs', data);

      alert(`Seu ID de acesso ${id}`);

      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img className="logo" src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </section>

        <form noValidate autoComplete="off" onSubmit={handleRegister}>
          <input type="text" placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <InputMask mask="+99 (99) 9.9999-9999" placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">
            <input type="text" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
            <input type="text" maxLength={2} max={2} minLength={2} min={2} placeholder="UF" value={uf} onChange={e => setUf(e.target.value.toUpperCase())} style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#e02041" /> Não tenho cadastro
        </Link>
      </div>
    </div>
  );
}
