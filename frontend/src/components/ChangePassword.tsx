import React, { useState } from 'react';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { api } from '../services/api';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/change-password', { currentPassword, newPassword });
      alert('Senha alterada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Falha ao alterar a senha.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Password value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Senha Atual" />
      <Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nova Senha" />
      <Button label="Alterar Senha" />
    </form>
  );
};

export default ChangePassword;