import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            command: () => navigate('/home')
        },
        {
            label: 'Usuários',
            command: () => navigate('/users')
        }
    ];

    return (
        <Menubar model={items} />
    );
};

export default Navbar;