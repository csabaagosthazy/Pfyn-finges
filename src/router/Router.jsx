import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "../context/Auth2";
import { AuthenticatedAdminRoute, AuthenticatedRoute } from "./AuthenticatedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/Home";
import UserPage from "../pages/User";
import AdminPage from "../pages/Admin";
import { Navigation } from "../components/NavBar";

const MainRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <AuthenticatedAdminRoute exact path="/admin" component={AdminPage} />
          <AuthenticatedRoute exact path="/user" component={UserPage} />
          <Route path="*" component={HomePage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default MainRouter;
