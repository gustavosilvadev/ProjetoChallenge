import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { api } from '../services/api';
import type { Product as ProductType } from '../types/Product';

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState<ProductType>({} as ProductType);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  const saveProduct = async () => {
    if (product.id) {
      await api.put(`/products/${product.id}`, product);
    } else {
      await api.post('/products', product);
    }
    fetchProducts();
    setProductDialog(false);
    setProduct({} as ProductType);
  };

  const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const productDialogFooter = (
    <div>
      <Button label="Cancelar" onClick={() => setProductDialog(false)} className="p-button-text" />
      <Button label="Salvar" onClick={saveProduct} />
    </div>
  );

  return (
    <div>
      <Button label="Novo Produto" onClick={() => setProductDialog(true)} />
      <DataTable value={products}>
        <Column field="name" header="Nome" />
        <Column field="description" header="Descrição" />
        <Column body={(rowData) => (
          <div>
            <Button label="Editar" onClick={() => { setProduct(rowData); setProductDialog(true); }} />
            <Button label="Deletar" onClick={() => deleteProduct(rowData.id)} className="p-button-danger" />
          </div>
        )} />
      </DataTable>
      <Dialog visible={productDialog} style={{ width: '450px' }} header="Detalhes do Produto" modal className="p-fluid" footer={productDialogFooter} onHide={() => setProductDialog(false)}>
        <div className="field">
          <label htmlFor="name">Nome</label>
          <InputText id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="description">Descrição</label>
          <InputText id="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        </div>
      </Dialog>
    </div>
  );
};

export default Product;