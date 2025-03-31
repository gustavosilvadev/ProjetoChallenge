import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password, name, email});
      
      console.log("response <<<<<<<<<<<<<<");
      console.log(response);
      console.log("response >>>>>>>>>>>>>>>");
      
      localStorage.setItem('token', response.data.token);
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Login falhou. Verifique suas credenciais.');
    }
  };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-96 p-6 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                
                    <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
                        <InputText 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full p-inputtext" 
                            placeholder="Enter your username" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                        <Password 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full" 
                            placeholder="Enter your password"
                            toggleMask
                        />
                    </div>

                    <InputText 
                            id="email" 
                            value={''} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type='hidden'
                            
                    />
                    <InputText 
                            id="name" 
                            value={''} 
                            onChange={(e) => setName(e.target.value)} 
                            type='hidden'
                            
                    />


                    {/* <Button label="Login" className="w-full p-button-primary mb-3" /> */}
                    <Button label="Login"  className="w-full p-button-primary mb-3" />
                    <div className="text-center text-sm">
                        <a href="#" className="text-blue-600 hover:underline">Create an account</a> | 
                        <a href="#" className="text-blue-600 hover:underline ml-2">Forgot password?</a>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;



/*
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
      <Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <Button label="Login" />
    </form>
  );
};

export default Login;
*/
