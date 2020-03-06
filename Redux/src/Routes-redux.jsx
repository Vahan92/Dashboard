import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import Register from './components/RegisterUser';
import Panel from './components/Panel';
import Login from './components/Login';
import Login_Register from "./components/Login_Register";

const Routes = () => (
  <Router>
    <Switch>
      {/* {localStorage.getItem("jwt") ? <Route path="/panel" exact component={Panel} /> :
        <Redirect to="/" />} */}
      {/* {!localStorage.getItem("jwt") ? [ */}
        <Route path="/" exact component={Login_Register} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/panel" exact component={Panel} />
      {/* ] : <Redirect to="/panel" />} */}
    </Switch>
  </Router>
);

export default Routes;
