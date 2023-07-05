import React from 'react';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import CursorOverlay from '../features/chat/WhiteBoard/CursorOverlay/CursorOverlay';
import { Provider } from 'react-redux';
import store from './store'
import { connectWithSocketServer } from '../features/chat/WhiteBoard/socketConn/socketConn';
import { useEffect } from 'react';

import Footer from '../features/footer/Footer';

const App = () => {
  useEffect(() => {
    connectWithSocketServer();
  }, [])
  return (
    <div>
    <Provider store={store}>
      <Navbar />
      <AppRoutes />
      <CursorOverlay/>
      <Footer />
    </Provider>
    </div>
  );
};

export default App;
