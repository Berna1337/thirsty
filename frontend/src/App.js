import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import Formulario from './components/UserData';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import Account from './components/Account';
import Feed from './components/Feed';

function App() {
  
  const [login, setLogin] = useState(false)

  function checkAuth() {
    fetch('/user', {
      method: 'GET',
      headers: {
      'Authorization': `${localStorage.getItem("token")}`
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

  useEffect(() => {
    checkAuth()
  }, [login]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={login ? <Dashboard setLogin={setLogin}/> : <LoginForm setLogin={setLogin} />} />
        <Route path="/signup" element={login ? <Dashboard setLogin={setLogin}/> : <SignupForm />} />
        <Route path="/login" element={login ? <Dashboard setLogin={setLogin}/> : <LoginForm setLogin={setLogin} />} />
        <Route path="/profile" element={login ? <Formulario setLogin={setLogin}/> : <LoginForm setLogin={setLogin} />} />
        <Route path="/dashboard" element={login ? <Dashboard setLogin={setLogin} /> : <LoginForm setLogin={setLogin} />} />
        <Route path="/stats" element={login ? <Stats setLogin={setLogin}/> : <LoginForm setLogin={setLogin} />} />
        <Route path="/account" element={login ? <Account setLogin={setLogin} /> : <LoginForm setLogin={setLogin} />} />
        <Route path="/feed" element={login ? <Feed setLogin={setLogin} /> : <LoginForm setLogin={setLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;