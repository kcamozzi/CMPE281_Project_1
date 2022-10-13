//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import 'react-tabs/style/react-tabs.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig)


function App({signOut, user}) {

  //console.log(user);

  return (
      <div className="App">
        <header className="App-header">
        <h3>CMPE281 Project 1</h3>
        <h3>Hello, {user.attributes.given_name} {user.attributes.family_name}</h3>
        </header>
        <Routes> 
          {/* <Route path="/" element={<Home />} ></Route> */}
          <Route path="/" element={<Dashboard/>} ></Route>
        </Routes>
      </div>
  );
}

export default withAuthenticator( App );
