import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Questions from './components/Questions';
import Callback from './components/Callback';

const App = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login token={token} />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/questions" element={<Questions token={token} />} />
      </Routes>
    </div>
  );
};

export default App;
