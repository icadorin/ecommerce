import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './data/store';
// Components
import Navbar from './components/navbar/navbar.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' component={ App }></Route>
      </Routes>
    </BrowserRouter>
    <App />
  </Provider>
);
