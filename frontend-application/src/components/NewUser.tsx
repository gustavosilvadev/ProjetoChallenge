import React, { useState } from 'react';
import api from '../services/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const NewUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      await api.post('/user/register', { username, password });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="new-user-container">
      <h2>Novo Usuário</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Usuário</label>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Senha</label>
          <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button label="Criar" onClick={handleCreateUser} />
      </div>
    </div>
  );
};

export default NewUser;