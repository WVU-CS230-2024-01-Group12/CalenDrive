import axios from "axios";
import "./UserEvent.css";
import { useState, useEffect } from "react";
import { UpdateEvent } from "./UpdateEvent";
import Map from "../Pages/Map";

export function GetEvent({ ev, onClick, currentUser, showing }) {
  const moderators = [
    "Alexander White",
    "Stephanie Kish",
    "Simon Hale",
    "Logan Parish",
    "Kyle Shumaker",
    "Seth McBee",
  ];

  const [event, setEvent] = useState({
    name: ev.title,
    desc: ev.description,
    address: ev.address,
    lat: ev.lat,
    lon: ev.lon,
    start: ev.start,
    end: ev.end,
    poster: ev.poster,
    rsvp: ev.rsvp,
  });

  /**
   * Asynchronously handles deletion of events
   * @param {Event} id Event to be deleted
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/events/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document
        .getElementById("editeventPopup")
        .setAttribute("style", "display: flex");
    } else {
      document
        .getElementById("editeventPopup")
        .setAttribute("style", "display: none");
    }
  }, [modal]);

  /**
   * Handles RSVPs for an event
   * @param {Event} id
   */
  const handleRSVP = async (id) => {
    try {
      let newEvent = {
        ...ev,
        name: ev.title,
        desc: ev.description,
        rsvp: ev.rsvp + 1,
      };
      setEvent(newEvent);
      await axios.put("http://localhost:8800/events/" + ev.id, newEvent);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setModal(!modal);
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
            <h5> Attendees: {ev.rsvp}</h5>
            <p> {ev.description}</p>
            <p>
              {new Date(ev.start).toLocaleString()} -{" "}
              {new Date(ev.end).toLocaleString()}{" "}
              <div height="300px">
                {/*Map doesn't render correctly unless waited to render*/}
                {!showing && (
                  <Map
                    height={"400px"}
                    width={"400px"}
                    lat={ev.lat}
                    lon={ev.lon}
                  />
                )}
              </div>
            </p>
          </div>
          <div className="buttons">
            <button id="rsvpButton" className="rsvp" onClick={handleRSVP}>
              RSVP
            </button>

            {
              /* Displays 'Edit Event' button for either poster of event or moderators */
              (ev.poster === currentUser.name ||
                moderators.includes(currentUser.name)) && (
                <button
                  id="editButton"
                  className="edit"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )
            }
            {
              /* Enables both poster and moderators to click edit event button */
              (ev.poster === currentUser.name ||
                moderators.includes(currentUser.name)) && (
                <UpdateEvent onClick={handleEditClick} ev={ev} />
              )
            }
            {
              /* Enables both poster and moderators to delete an event */
              (ev.poster === currentUser.name ||
                moderators.includes(currentUser.name)) && (
                <button
                  id="deleteButton"
                  className="delete"
                  onClick={() => handleDelete(ev.id)}
                >
                  Delete
                </button>
              )
            }
          </div>
        </div>
        <UpdateEvent ev={ev} onClick={handleEditClick} />
      </div>
    </>
  );
}
