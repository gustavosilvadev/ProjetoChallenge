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

type User = {
    id: string | null;
    name: string;
    email:string;
    image: string | null;

};


const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast | null>(null);
    const dt = useRef<DataTable<User[]> | null>(null);

    let emptyUser: User = {
        id: null,
        name: '',
        email:'',
        image: null,
    };

    const [user, setUser] = useState<User>(emptyUser);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await api.get('/user');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };
    const [filters, setFilters] = useState<{ global: { value: string | null; matchMode: string } }>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


    const saveUser = () => {
        setSubmitted(true);

        if (user.name.trim()) {
            let _users = [...users];
            let _user = { ...user };

            if (user.id) {
                const index = _users.findIndex((u) => u.id === user.id);
                _users[index] = _user;
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User Updated', life: 3000 });
            } else {
                _user.id = createId();
                _user.image = 'user-placeholder.svg';
                _users.push(_user);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User Created', life: 3000 });
            }

            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        }
    };

    const editUser = (user: User) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteUser = (user: User) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        setUsers(users.filter((val) => val.id !== user.id));
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Usuário deletado', life: 3000 });
    };

    const createId = () => {
        return Math.random().toString(36).substr(2, 5);
    };

    const header = (
        <div className="flex justify-between items-center">
            <h4 className="m-0">Lista de Usuários</h4>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
        </>
    );

    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser} />
        </>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={() => <Button label="Novo Usuário" icon="pi pi-plus" onClick={openNew} />} />
                <DataTable 
                  
                  value={users}
                  selection={selectedUsers}
                  onSelectionChange={(e) => setSelectedUsers(e.value as User[])}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  header={header}
                >
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="username" header="Usuário" sortable></Column>
                    <Column field="email" header="Email" sortable></Column>
                    <Column field="userProfile" header="Perfil" sortable></Column>


                    
                    <Column header= "Ações" body={(rowData: User) => (
                        <>
                            <Button icon="pi pi-pencil" onClick={() => editUser(rowData)} />
                            <Button icon="pi pi-trash" className="ml-2" onClick={() => confirmDeleteUser(rowData)} />
                        </>
                    )} />
                </DataTable>
            </div>
            <Dialog visible={userDialog} header="Editar" modal footer={userDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                </div>
                <div className="field">
                  <label htmlFor="name">Email</label>
                  <InputText id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                </div>
            </Dialog>
            <Dialog visible={deleteUserDialog} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <p>Are you sure you want to delete <b>{user.name}</b>?</p>
            </Dialog>
        </div>
    );
};

export default UserList;
