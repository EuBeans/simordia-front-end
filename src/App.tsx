import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import GameContainer from './components/gameContainer';
import UserLogin from './components/userLogin';
import { setAuth } from "./redux/actions/authSlice";
import UserRegsiter from './components/userRegister';
import {useAppSelector, useAppDispatch} from './utils/useAppDispatch';
import { Box } from '@mui/material';
import { theme } from './assets/theme';
import {validateTokenAction} from './redux/actions/authSlice';



const App = () => {

  //if local storage has a token, then user is authenticated, we will then add the token to the state of the app


  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if token is in local storage, but not in redux state, then set it
    //validate token
    if(localStorage.getItem("token")){
       dispatch(validateTokenAction());
    }
}, []);

  useEffect(() => {
    // if token is in local storage, but not in redux state, then set it
    //validate token
    if(isAuthenticated){
      if(window.location.pathname !== "/game"){
        window.location.pathname = "/game";
        
      }
    }
  }, [isAuthenticated]);

  
  const containerStyle = {
    backgroundColor: theme.palette.background.default,
    overflow: "hidden",
    position: "relative"
  }
  return (
    <Box sx={containerStyle}>
      <BrowserRouter >
        <Routes>
          <Route path={'/'} element={<UserLogin/>}/>
          <Route path={'/register'} element={<UserRegsiter/>}/>
          <Route path={'/game'} element={<GameContainer/>}/>
        </Routes>
      </BrowserRouter >
    </Box>
    
  );
};

export default App;
