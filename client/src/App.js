import React, { Component } from 'react';

import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Editprofile from './components/Editprofile';

class App extends Component {
  render() {
  
    return (

    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route> 
        <Route path="/Editprofile" element={<Editprofile/>}></Route> 
      </Routes> 
      </BrowserRouter>
    );
  }
}

export default App;