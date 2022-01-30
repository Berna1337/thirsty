import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import Formulario from './components/UserData';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';

function App() {
  
  const [login, setLogin] = useState(false)
  
  function tokenFromLocal() {
    const token = localStorage.getItem("token")
    return token;
  }

  function checkAuth(token) {
    fetch('/user', {
      method: 'GET',
      headers: {
      'Authorization': `${token}`
      },
    }).then(res => {
      if (res.status == 200) {
        setLogin(true)
        return
      }
      else if (res.status == 403) {
        setLogin(false)
        return
      }
    })
    .catch(error => console.log(error))
  }
  
  const userToken = tokenFromLocal()
  

  useEffect(() => {
    checkAuth(userToken)
    setInterval(() => {
      const userToken = tokenFromLocal()
      checkAuth(userToken)
  }, 4224);
    
  }, []);
  

  
  
  return (
    <BrowserRouter>
      <div>
        {String(login)}
      </div>
      
      <Routes>
        <Route exact path="/" element={login ? <Dashboard token={userToken}/> : <LoginForm />} />
        <Route path="/signup" element={login ? <Dashboard token={userToken}/> : <SignupForm />} />
        <Route path="/login" element={login ? <Dashboard token={userToken}/> : <LoginForm />} />
        <Route path="/profile" element={login ? <Formulario token={userToken}/> : <LoginForm />} />
        <Route path="/dashboard" element={login ? <Dashboard token={userToken}/> : <LoginForm />} />
        <Route path="/stats" element={login ? <Stats token={userToken}/> : <LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;