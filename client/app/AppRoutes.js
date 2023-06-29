import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import UserView from '../features/userView/userView';
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
		<div>
			{isLoggedIn ? (
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/profile" element={<UserView />} />
					<Route path="/profile/:id" element={<UserView />} />
				</Routes>
			) : (
				<Routes>
					<Route
						path="/*"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/login"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/signup"
						element={<AuthForm name="signup" displayName="Sign Up" />}
					/>
				</Routes>
			)}
		</div>
	);
};

export default AppRoutes;
