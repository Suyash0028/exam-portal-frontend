import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import logo from "/logo.png";
import { getUsers } from '../../Utils/UserService';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const [navbarExpanded, setNavbarExpanded] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [userFirstName, setUserFirstName] = useState<string>('');

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchUserFirstName = () => {
            // Assuming you have a way to get the authenticated user's data
            const userId: any = localStorage.getItem("userId");
            if (userId) {
                const authenticatedUser = users.find(user => user._id === userId);
                if (authenticatedUser) {
                    setUserFirstName(authenticatedUser.fullName);
                }
            } else {
                setUserFirstName("admin");
            }
        };

        fetchUsers();
        fetchUserFirstName();
    }, [users]);

    const handleNavbarToggle = () => {
        setNavbarExpanded(!navbarExpanded);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setNavbarExpanded(false)}>
                    <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                    Exam Portal
                </Link>
                {!isAuthenticated ? <>
                    <button className="navbar-toggler" type="button" onClick={handleNavbarToggle} aria-expanded={navbarExpanded ? true : false} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${navbarExpanded ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto">
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={() => setNavbarExpanded(false)}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup" onClick={() => setNavbarExpanded(false)}>Signup</Link>
                                </li>
                            </>
                        </ul>
                    </div>
                </> : null}

                {isAuthenticated && (
                    <div className="d-flex align-items-center">
                        <Dropdown drop="down">
                            <Dropdown.Toggle variant="outline-light" id="user-dropdown" className='m-2'>
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    left: 'auto',
                                    minWidth: '10rem', // Adjust as needed
                                }}
                            >
                                <Dropdown.Item disabled={true}>Welcome, {userFirstName}</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
