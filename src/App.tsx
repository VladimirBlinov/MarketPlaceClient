import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import Home from './components/Home';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import ProductList from './components/ProductList';
import Profile from './components/Profile';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import IUser from './entities/user.type';
import * as AuthService from "./services/auth.service";
import { AuthProvider } from './services/authProvider';

export default function App () {
  // const [showProductsList, setshowProductsList] = useState<boolean>(false);
  // const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  // useEffect(() => {
  //   const user = AuthService.getCurrentUser().then((user) => {
  //   if (user) {
  //     setCurrentUser(user);
  //     setshowProductsList(true);
  //   }
  //   });

  //   // EventBus.on("logout", logOut);
  //   // return () => {
  //   //   EventBus.remove("logout", logOut);
  //   // };
  // }, []);


  // const logOut = () => {
  //   AuthService.logout();
  //   setShowAdminBoard(false);
  //   setCurrentUser(undefined);
  // };
  return (

    <AuthProvider>
        <Routes>
          <Route path={"/"} element={<Layout />} >
            
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register/>} />
            <Route path="profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            <Route path="products" element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            } />
          </Route>
        </Routes>
    </AuthProvider>
  );
};

