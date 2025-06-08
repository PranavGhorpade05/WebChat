import { useState } from 'react'
import './App.css'
import {Route,Routes,BrowserRouter as Router,Link} from "react-router-dom";
import Login from './login';
import Home from './home';
import Signup from './signup';
function App() {
  return (
    <Router>
       <Routes>
          <Route path = '/' element = {<Login />} />
          <Route path = '/home' element = {<Home/>} />
          <Route path = '/signup' element = {<Signup/>} />
      </Routes>
    </Router>
  )
}

export default App
