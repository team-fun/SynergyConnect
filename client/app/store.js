import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import createRoomFormSlice from '../features/home/createRoomFormSlice';

const store = configureStore({
  reducer: { auth: authReducer, 
             createRoom: createRoomFormSlice            
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
