import React from "react";
import axios from "axios";
import "./UserEvent.css";
import { useState } from "react";
import { UpdateEvent } from "./UpdateEvent";
import Map from "../Pages/Map";

export function GetEvent({ ev, onClick }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/events/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [modal, setModal] = useState(false);

  const handleEditClick = () => {
    setModal(!modal);
    if (modal) {
      document
        .getElementById("editeventPopup")
        .setAttribute("style", "display: flex");
    } else {
      document
        .getElementById("editeventPopup")
        .setAttribute("style", "display: none");
    }
  };

  return (
    <>
      <div id="eventPopup" className="eventModal">
        <div className="closeEvent" onClick={onClick}>
          &times;
        </div>
        <div className="eventContent">
          <div className="eventHeader">
            <h1>{ev.title}</h1>
          </div>
          <div className="eventBody">
            <h3> {ev.address}</h3>
            <p> {ev.description}</p>
            <p>
              {new Date(ev.start).toLocaleString()} -{" "}
              {new Date(ev.end).toLocaleString()}{" "}
              <div height="300px">
                <Map
                  height={"400px"}
                  width={"400px"}
                  lat={ev.lat}
                  lon={ev.lon}
                />{" "}
              </div>
            </p>
          </div>
          <div className="buttons">
            <button id="rsvpButton" className="rsvp">
              RSVP
            </button>
            <button id="editButton" className="edit" onClick={handleEditClick}>
              Edit
            </button>
            <UpdateEvent onClick={handleEditClick} ev={ev} />
            <button
              id="deleteButton"
              className="delete"
              onClick={() => handleDelete(ev.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
