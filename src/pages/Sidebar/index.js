import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Sidebar = ({ setUser }) => { // Receba setUser como prop
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Remove o usuário autenticado
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <div className="sidebar">
      <div className="sidebar-itens">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/workoutroutine">Rotina de Treino</Link>
          </li>
          <li>
            <Link to="/nutrition">Definir meta de proteínas</Link>
          </li>
        </ul>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;