import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await api.get(`/api/products/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
    };
    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async () => {
    try {
      await api.put(`/api/products/${id}`, { name, price });

    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Editar Produto</h2>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nome</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="price">Preço</label>
          <InputText id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <Button label="Atualizar" onClick={handleUpdateProduct} />
      </div>
    </div>
  );
};

export default EditProduct;