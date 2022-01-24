import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import Formulario from './components/UserData';


function App() {
  
  const [login, setLogin] = useState(false)
  
  return (
    <div>
      <Formulario></Formulario>
    </div>
  );
}

export default App;

/*<BrowserRouter>
      <div>
        
      </div>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>*/
