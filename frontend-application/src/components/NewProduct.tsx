import React, { useState } from 'react';
import api from '../services/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const NewProduct: React.FC = () => {
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [IdUser, setIdUser] = useState('');
  const [Description, setDescription] = useState('');
  const [Quantity, setQuantity] = useState('');

  const handleCreateProduct = async () => {
    try {

      setIdUser('');
      await api.post('/api/products', { Name, Price, Description, Quantity, IdUser });
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
          <InputText id="name" value={Name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="price">Preço</label>
          <InputText id="price" value={Price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="p-field">
          <label htmlFor="price">Descrição</label>
          <InputText id="price" value={Description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="p-field">
          <label htmlFor="price">Quantidade</label>
          <InputText id="price" value={Quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>



        <Button label="Criar" onClick={handleCreateProduct} />
      </div>
    </div>
  );
};

export default NewProduct;