import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import AdminDashboard from './Admin/AdminDashboard'
import Questionnaire from '../Views/Questionnaire';
import ProtectedRoute from '../Views/ProtectedRoute';
import Navbar from './User/Navbar';
import UserDashboard from './User/UserDashboard';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const MainApp: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  let location = useLocation();
  return (
    <Router>
      <Navbar />
      <Switch location={location}>
        <Route path="/login">
          {isAuthenticated ? <Redirect to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} /> : <LoginForm />}
        </Route>
        <Route path="/signup">
          {isAuthenticated ? <Redirect to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} /> : <SignupForm />}
        </Route>
        <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} />
        <ProtectedRoute path="/user-dashboard" component={UserDashboard} />
        <ProtectedRoute path="/questionnaire" component={Questionnaire} />
        <Route path="/">
          {isAuthenticated ? <Redirect to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default MainApp;