import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import MainPage from './Pages/MainPage';
import OAuth2Callback from './Pages/OAuth2Callback';

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-3">CalendDrive</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/oauth2callback" element={<OAuth2Callback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
