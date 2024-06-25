import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainApp from './Components/MainApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <MainApp />
    </AuthProvider>
  );
};

export default App;
