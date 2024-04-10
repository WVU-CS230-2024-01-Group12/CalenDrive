import './App.css';
import React from 'react';
import InteractiveCalendar from './InteractiveCalendar.js';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import EditEvent from './event_files/EditEvent.js'
import Nav from './Navbar/Nav.js'


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path = "/" element = {<InteractiveCalendar />}/>
          <Route path = "/edit-event" element = {<EditEvent />}/>
        </Routes>
    </div>
  );
}

export default App;

