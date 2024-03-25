import logo from "./logo.svg";
import "./App.css";
import React from "react";
import InteractiveCalendar from "./InteractiveCalendar.js";
import EventLocationMap from "./EventLocationMap.js";
function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-3">Interactive Calendar</h1>
      <InteractiveCalendar />
      <div height="50px">
        <EventLocationMap height="300px" width="400px" />
      </div>
    </div>
  );
}

export default App;
