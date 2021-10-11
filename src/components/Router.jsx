import _ from "lodash";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthenticatedRoute, AuthenticatedAdminRoute } from "../router/AuthenticatedRoute";
import SignIn from "../pages/SignIn";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/Home";
import UserPage from "../pages/User";
import AdminPage from "../pages/Admin";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <AuthenticatedAdminRoute exact path="/successLogin" component={AdminPage} />
        <AuthenticatedAdminRoute exact path="/admin" component={AdminPage} />
        <AuthenticatedRoute exact path="/user" component={UserPage} />
        <Route path="*" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
