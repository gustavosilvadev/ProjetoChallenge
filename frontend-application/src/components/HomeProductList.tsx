import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import api from '../services/api';

type Product = {
    id: string | null;
    name: string;
    description:string;
    price: string | null;
    quantity: string | null;
    image: string | null;
};


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [selectedProducts, setselectedProducts] = useState<Product[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast | null>(null);
    const dt = useRef<DataTable<Product[]> | null>(null);

    let emptyProduct: Product = {
        id: null,
        name: '',
        description:'',
        price: null,
        quantity: '',
        image: null

    };

    const [product, setProduct] = useState<Product>(emptyProduct);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get('/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteproductDialog = () => {
        setDeleteProductDialog(false);
    };
    const [filters, setFilters] = useState<{ global: { value: string | null; matchMode: string } }>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = _products.findIndex((u) => u.id === product.id);
                _products[index] = _product;
                toast.current?.show({ severity: 'success', summary: 'Atualizado!', detail: 'Produto atualizado', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current?.show({ severity: 'success', summary: 'Criado!', detail: 'Produto criado', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product: Product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        setProducts(products.filter((val) => val.id !== product.id));
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({ severity: 'success', summary: 'Deletado!', detail: 'Produto deletado', life: 3000 });
    };

    const createId = () => {
        return Math.random().toString(36).substr(2, 5);
    };

    const header = (
        <div className="flex justify-between items-center">
            <h4 className="m-0">Lista de Produtos</h4>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" onClick={saveProduct} />
        </>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDeleteproductDialog} />
            <Button label="Deletar" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </>
    );

    return (
        <div>

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={() => <Button label="Novo Produto" icon="pi pi-plus" onClick={openNew} />} />
                <DataTable 
                  
                  value={products}
                  selection={selectedProducts}
                  onSelectionChange={(e) => setselectedProducts(e.value as Product[])}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  header={header}
                >
                    <Column field="name" header="Nome" sortable></Column>
                    <Column field="description" header="Descrição" sortable></Column>
                    <Column field="price" header="Preço" sortable></Column>
                    <Column field="quantity" header="Quantidade" sortable></Column>


                    
                    <Column header= "Ações" body={(rowData: Product) => (
                        <>
                            <Button icon="pi pi-pencil" onClick={() => editProduct(rowData)} />
                            <Button icon="pi pi-trash" className="ml-2" onClick={() => confirmDeleteProduct(rowData)} />
                        </>
                    )} />
                </DataTable>
            </div>
            <Dialog visible={productDialog} header="Editar" modal footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="Description">Nome</label>
                    <InputText id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
                </div>
                <div className="field">
                  <label htmlFor="Description">Descrição</label>
                  <InputText id="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
                </div>


                <div className="field">
                  <label htmlFor="Price">Valor</label>
                  <InputText id="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                </div>


                <div className="field">
                  <label htmlFor="Quantity">Quantidade</label>
                  <InputText id="quantity" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} required />
                </div>
            </Dialog>
            <Dialog visible={deleteProductDialog} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteproductDialog}>
                <p>Você tem certeza que deseja deletar  <b>{product.name}</b>?</p>
            </Dialog>
        </div>
    );
};

export default ProductList;
