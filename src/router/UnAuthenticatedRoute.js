import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuth();
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) => (!isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />)}
    />
  );
};
