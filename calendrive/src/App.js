import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import EditEvent from './event_files/EditEvent.js'

import MainPage from './Pages/MainPage';
import Profile from './Pages/Profile'
import OAuth2Callback from './Pages/OAuth2Callback';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<MainPage />}/>
          <Route path="/profile" element = {<Profile />}/>
          <Route path="/edit-event" element = {<EditEvent />}/>
          <Route path="/oauth2callback" element={<OAuth2Callback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

