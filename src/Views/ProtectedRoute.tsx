import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props:any) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

