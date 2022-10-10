//import logo from './logo.svg';
import '../App.css';
import { Account, AccountContext } from '../components/Account';
import Status from "../components/Status";
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterAndLogin from '../components/RegisterAndLogin';
import Dashboard from '../components/Dashboard';
import Box from '@mui/material/Box';
import 'react-tabs/style/react-tabs.css';


function Home() {

  return (
      <div className="App">
        <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              bgcolor: '#989D9E',
              width: 1,
              justifyContent: 'center',
              pt: 4
            }}
              minHeight="100vh"
              >
            <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 600,
                  }}
                  >
                <Account>
                <Status/>
                <RegisterAndLogin/>
                </Account>
              </Box>
          </Box>
      </div>
  );
}

export default Home;
