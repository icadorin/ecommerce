import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Shop from './screens/Shop';
import Login from './screens/Login';
import ViewProduct from './screens/ViewProduct';
import Payment from './screens/Payment';
import Footer from './components/Footer';

const EcommerceRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} />
        <Route path="/payment/:id" element={<Payment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default EcommerceRoutes;
