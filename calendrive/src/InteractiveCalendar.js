import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GetEvent } from "./event_files/UserEvent.js";
import "./event_files/UserEvent.css";
import "./event_files/AddEvent.css";
import { AddEvent } from "./event_files/AddEvent.js";
import "./InteractiveCalendar.css";
import Backend from "./Backend.js";

const localizer = momentLocalizer(moment);

const InteractiveCalendar = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  /**
   * Handles fetching list of events from backend
   */
  const fetchEvents = async () => {
    setEvents(await Backend.GetEvents());
  };

  const [modal, setModal] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document
        .getElementById("eventPopup")
        .setAttribute("style", "display: flex");
    } else {
      document
        .getElementById("eventPopup")
        .setAttribute("style", "display: none");
    }
  }, [modal]);

  useEffect(() => {
    if (addEventModal) {
      document
        .getElementById("addeventPopup")
        .setAttribute("style", "display: flex");
    } else {
      document
        .getElementById("addeventPopup")
        .setAttribute("style", "display: none");
    }
  }, [addEventModal]);

  /**
   * Function to handle clicking on an event on the calendar
   * @param {Event} event
   */
  const handleEventClick = (event) => {
    const accountInfo = Backend.GetAccountInfo();

    if (accountInfo != null) {
      setUser(accountInfo);
    }

    setModal(!modal);
    setSelectedEvent(event);
  };

  /**
   * Handles clicking the Add Event button
   */
  const handleAddEventClick = () => {
    const accountInfo = Backend.GetAccountInfo();

    if (accountInfo != null) {
      setUser(accountInfo);
      setAddEventModal(!addEventModal);
    } else {
      window.alert("please sign in before trying to add an event");
    }
  };

  return (
    <div className="full-screen-calendar">
      <button id="AddEventButton" onClick={handleAddEventClick}>
        Add Event
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        style={{ padding: "10px" }}
      />

      <GetEvent
        ev={selectedEvent}
        currentUser={user}
        onClick={handleEventClick}
        showing={modal}
      />
      <AddEvent currentUser={user} onClick={handleAddEventClick} />
    </div>
  );
};

export default InteractiveCalendar;
