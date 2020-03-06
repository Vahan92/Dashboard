import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Routes from './Routes-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
