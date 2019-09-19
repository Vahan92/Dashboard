import React from 'react';
import './App.css';

import Registration from './components/registration';
import Login from './components/login';
import Panel from './components/panel';
import Users from './components/panel_components/users';


function App() {
  return (
    <div className="App">
      {/* <Registration/> */}
      {/* <Login/> */}
      {/* <Panel/> */}
      <Users/>
    </div>
  );
}

export default App;
