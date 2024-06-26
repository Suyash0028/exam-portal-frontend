import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainApp from './Components/MainApp';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
