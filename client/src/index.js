import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Redux
import {Provier } from 'react-redux';
import store from './data/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provier store={store}>
    <App />
  </Provier>
);
