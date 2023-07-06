import React from 'react';
import "tailwindcss/tailwind.css";

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store'

import Footer from '../features/footer/Footer';

const App = () => {
  return (
    <div>
   
    <Provider store={store}>
      <Navbar />
      <AppRoutes />
      <Footer />
    </Provider>
    </div>
  );
};

export default App;
