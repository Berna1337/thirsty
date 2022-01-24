import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';


function App() {
  
  const [login, setLogin] = useState(false)
  
  return (
    <BrowserRouter>
      <div>
        
      </div>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
