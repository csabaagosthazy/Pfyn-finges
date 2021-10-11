import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...props}
      render={(routeProps) => (isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />)}
    />
  );
};

export const AuthenticatedAdminRoute = ({ component: C, ...props }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (!isAuthenticated) return <Redirect to="/" />;
        if (!isAdmin) return <Redirect to="/User" />;
        return <C {...routeProps} />;
      }}
    />
  );
};
