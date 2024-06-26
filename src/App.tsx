import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainApp from './Components/MainApp';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
