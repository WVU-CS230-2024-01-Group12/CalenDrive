import logo from './logo.svg';
import './App.css';
import React from 'react';
import InteractiveCalendar from './InteractiveCalendar.js';


function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-3">Interactive Calendar</h1>
      <InteractiveCalendar />

      <button><Link to="/signin">Sign In</Link></button>
    </div>
  );
}

export default App;
