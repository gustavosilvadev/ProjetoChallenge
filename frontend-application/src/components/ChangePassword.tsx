import React, { useState } from 'react';
import api from '../services/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      await api.put('/user/change-password', { currentPassword, newPassword });

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Alterar Senha</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="currentPassword">Senha Atual</label>
          <InputText id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="newPassword">Nova Senha</label>
          <InputText id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <Button label="Alterar" onClick={handleChangePassword} />
      </div>
    </div>
  );
};

export default ChangePassword;