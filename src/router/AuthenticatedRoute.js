import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/Auth2";

export const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...props}
      render={(routeProps) => (currentUser ? <C {...routeProps} /> : <Redirect to="/" />)}
    />
  );
};

export const AuthenticatedAdminRoute = ({ component: C, ...props }) => {
  const { currentUser, isAdmin } = useAuth();
  return (
    <Route
      {...props}
      render={(routeProps) =>
        currentUser && isAdmin ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
