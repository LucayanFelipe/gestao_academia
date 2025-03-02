import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importe o Link para navegação
import './style.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_]+$/;
    return password.length >= 6 && passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setMessage('Email inválido.');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('A senha deve ter pelo menos 6 caracteres e conter apenas letras, números e os caracteres especiais permitidos.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', { name, email, password });
      setMessage('Registro realizado com sucesso!');
      localStorage.clear();
      alert('Registro realizado com sucesso!');
      navigate('/');
    } catch (err) {
      setMessage('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
        {message && <p className="message">{message}</p>}
        <div className="login-link">
          <p>Já possui cadastro? <Link to="/">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
