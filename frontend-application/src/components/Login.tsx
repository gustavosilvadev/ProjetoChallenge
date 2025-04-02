import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
    //   const response = await api.post('/login', { username, password });
    //   localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Usuário</label>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Senha</label>
          <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button label="Entrar" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
