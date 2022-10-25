import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './data/store';

// Components
import Navbar from './components/navbar/navbar.component';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' component={App} />
      </Routes>
    </BrowserRouter>
    <App />
  </Provider>,
  document.getElementById('root')
);
