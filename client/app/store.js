import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import allUsersSlice from '../features/admin/adminViewSlice';
import editUserSlice from '../features/admin/editUserSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    allUsers: allUsersSlice,
    editUser: editUserSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
