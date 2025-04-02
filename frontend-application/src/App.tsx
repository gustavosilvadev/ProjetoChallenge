import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import HomeProductList from './components/HomeProductList';
import UserList from './components/UserList';
import Navbar from './components/Navbar';


const AppContent = () => {
  return (
      <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomeProductList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
      </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
        <NavbarWrapper>
            <AppContent />
        </NavbarWrapper>
    </Router>
  );
};

interface NavbarWrapperProps {
  children: React.ReactNode;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  const location = window.location.pathname;
  return (
      <>
          {location !== '/login' && <Navbar />}
          {children}
      </>
  );
};

export default App;