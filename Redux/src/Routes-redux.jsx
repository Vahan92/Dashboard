import React from "react";
import Panel from './components/Panel';
import Login from './components/Login';

function Routes() {
  const isLoggedIn = localStorage.getItem('jwt');
  if (isLoggedIn) {
    return <Panel />;
  }
  return <Login />;
}

export default Routes;
