import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import logo from "/logo.png";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [navbarWidth, setNavbarWidth] = useState<number>(0);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleResize = () => {
      setNavbarWidth(window.innerWidth);
    };

    // Initial width on component mount
    setNavbarWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav style={{ width: navbarWidth }} className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
          Exam Portal
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {!isAuthenticated ? (<Link className="nav-link" to="/login">Login</Link>) : null}
            </li>
            <li className="nav-item">
              {!isAuthenticated ? (<Link className="nav-link" to="/signup">Signup</Link>) : null}
            </li>
          </ul>
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">Welcome, User</span>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
