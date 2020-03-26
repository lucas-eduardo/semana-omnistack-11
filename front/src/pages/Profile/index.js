import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiMenu } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const [incidents, setIncidentens] = useState([]);
  const [classMenu, setClassMenu] = useState('');
  const [activeMenu, setActiveMenu] = useState(false);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('/profiles', {
      headers: {
        Authorization: ongId
      }
    }).then(({ data }) => {
      setIncidentens(data);
    });
  }, [ongId]);

  useEffect(() => {
    window.onclick = ({ target }) => {
      if ((!target.id || target.id !== 'menu') && activeMenu) {
        setActiveMenu(false);
        setClassMenu('animate-close');
        setTimeout(() => {
          setClassMenu('');
          document.body.style.overflow = 'auto';
        }, 200);
      }
    }
  }, [activeMenu]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidentens(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  function handleMenu() {
    setClassMenu('animate-open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      setClassMenu('active');
      setActiveMenu(true);
    }, 150);
  }

  return (
    <>
      <div id="menu" className={`menu-content ${classMenu}`}>
        {activeMenu && (
          <>
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
              <FiPower size={18} color="#e02041" /> Sair
            </button>
          </>
        )}
      </div>
      <div className="profile-container">
        <header>
          <div className="left">
            <img src={logoImg} alt="Be the Hero"/>
            <span>Bem vinda, {ongName}</span>
          </div>

          <div className="right">
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
              <FiPower size={18} color="#e02041" />
            </button>
            <button className="menu" type="button" onClick={handleMenu}>
              <FiMenu size={42} color="#e02041" />
            </button>
          </div>
        </header>

        <h1>Casos cadastrados</h1>

        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
