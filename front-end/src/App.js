import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

import DeliveryProvider from './context/DeliveryProvider';
import CustomerCheckout from './pages/CustomerCheckout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Products from './pages/Products';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <DeliveryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
          <Route path="/" element={ <Navigate to="/login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/orders" element={ <Orders /> } />
          <Route path="/seller/orders" element={ <Orders /> } />
          <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
          <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
          <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
        </Routes>
      </BrowserRouter>
    </DeliveryProvider>
  );
}

export default App;
