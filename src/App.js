import logo from "./logo.svg";
import "./App.css";
import React from "react";
import InteractiveCalendar from "./InteractiveCalendar.js";
import Map from "./Map.js";
function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-3">Interactive Calendar</h1>
      <InteractiveCalendar />
      <Map height="300px" width="400px" lon={-79.953} lat={39.634} />
    </div>
  );
}

export default App;
