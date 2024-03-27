import './App.css';
import React from 'react';
import InteractiveCalendar from './InteractiveCalendar.js';
import {GetEvent, event} from './event_files/UserEvent.js'

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-3">Interactive Calendar</h1>
      <InteractiveCalendar />
    </div>
  );
}

export default App;
