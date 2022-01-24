import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm'


function App() {
  
  const [login, setLogin] = useState(false)
  
  return (
    <BrowserRouter>
      <div>
        {/* <LoginForm /> */}
        {/* <SignupForm /> */}
        {/* {!login ? <LoginForm /> : <SignupForm />} */}
      </div>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
