//import logo from './logo.svg';
import './App.css';
import { Account, AccountContext } from './components/Account';
import Status from "./components/Status";
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterAndLogin from './components/RegisterAndLogin';
import Home from './components/Home'
import Dashboard from './components/Dashboard';
import Box from '@mui/material/Box';
import 'react-tabs/style/react-tabs.css';


function App() {

  return (
      <div className="App">
        <header className="App-header">
        <h3>CMPE281 Project 1</h3>
        </header>
        <Routes> 
          <Route path="/" element={<Home />} ></Route>
          <Route path="/dashboard/" element={<Dashboard/>} ></Route>
        </Routes>
      </div>
  );
}

export default App;
