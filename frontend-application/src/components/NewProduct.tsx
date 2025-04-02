import React, { useState } from 'react';
import api from '../services/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const NewProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleCreateProduct = async () => {
    try {
      await api.post('/api/products', { name, price });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <div className="new-product-container">
      <h2>Novo Produto</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nome</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="price">Preço</label>
          <InputText id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <Button label="Criar" onClick={handleCreateProduct} />
      </div>
    </div>
  );
};

export default NewProduct;