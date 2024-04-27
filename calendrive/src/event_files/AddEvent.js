import React from "react";
import axios from "axios";
import "./AddEvent.css";
import { useState } from "react";
import AddressBar from "../address_autocomplete/AddressBar.js";

export function AddEvent({ currentUser, onClick }) {

  const [event, setEvent] = useState({
    name: "",
    desc: "",
    address: "",
    lat: 0,
    lon: 0,
    start: "",
    end: "",
    poster: ""
  });

  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEvent((prev) => ({...prev, poster : currentUser.name}))
    try {
      await axios.post("http://localhost:8800/events", event);
      window.location.reload();
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <div id="addeventPopup" className="eventModal">
        <div className="closeEvent" onClick={onClick}>
          &times;
        </div>
        <div className="eventContent">
          <div className="eventHeader">
            <h1>Add New Event</h1>
          </div>
          <div className="eventBody">
            <div className="form">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Event Name"
                onChange={handleChange}
                required
              />
              <AddressBar onTest={(val) => setEvent(val)} />
              <input
                type="text"
                id="desc"
                name="desc"
                placeholder="Event Description"
                onChange={handleChange}
              />
              <input
                type="datetime-local"
                id="start"
                name="start"
                onChange={handleChange}
                required
              />
              <input
                type="datetime-local"
                id="end"
                name="end"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="buttons">
            <button id="AddButton" className="AddButton" onClick={handleSubmit}>
              Add Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
