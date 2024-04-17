import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import EditEvent from './event_files/EditEvent.js'
import Nav from './Navbar/Nav.js'

import MainPage from './Pages/MainPage';
import OAuth2Callback from './Pages/OAuth2Callback';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<MainPage />}/>
          <Route path = "/edit-event" element = {<EditEvent />}/>
          <Route path="/oauth2callback" element={<OAuth2Callback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

