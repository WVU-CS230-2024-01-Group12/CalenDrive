import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InteractiveCalendar.css';
import {GetEvent} from './event_files/UserEvent.js';

const localizer = momentLocalizer(moment);

const InteractiveCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Meeting 1',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 11, 0),
    },
  
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', start: new Date(), end: new Date() });
  };

  const handleInputChange = (field, value) => {
    setNewEvent({
      ...newEvent,
      [field]: value,
    });
  };


  const [currentEvent, setCurrentEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  const [modal, setModal] = useState(false);

  const handleEventClick = event => {
    setModal(!modal)
    if(modal){
      setCurrentEvent(event);
      document.getElementById("eventPopup").setAttribute('style', "display: flex");
    }else{
      document.getElementById("eventPopup").setAttribute('style', "display: none");
      
    }
  }


  return (
    <div className="full-screen-calendar">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEventClick}
              style={{ height: '100vh' }}
            />
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h3>Add Event</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eventStart" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="eventStart"
                    value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange('start', new Date(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eventEnd" className="form-label">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="eventEnd"
                    value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange('end', new Date(e.target.value))}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleAddEvent}>
                  Add Event
                </button>
              </form>
            </div>
          </div>
        </div>
        <GetEvent onClick={handleEventClick} ev={currentEvent}/>
      </div>

    </div>
  );
};

export default InteractiveCalendar;