import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { GetEvent } from './event_files/UserEvent.js';
import './event_files/UserEvent.css';
import './event_files/AddEvent.css';
import { AddEvent } from './event_files/AddEvent.js';
import './InteractiveCalendar.css';
import Backend from './Backend.js';

const localizer = momentLocalizer(moment);

const InteractiveCalendar = () => {

    const [user, setUser] = useState({
      name: ''
    })
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({
      title: '',
      start: new Date(),
      end: new Date(),
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8800/events');

            const formattedEvents = response.data.map(event => ({
                id: event.id,
                title: event.name,
                description: event.desc,
                address: event.address,
                lat: event.lat,
                lon: event.lon,
                start: new Date(event.start),
                end: new Date(event.end),
                poster: event.poster
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const [modal, setModal] = useState(false);

    const handleEventClick = event => {
      Backend.GetAccountInfo().then(result => {
        if(result != null){
          setUser(result);
        }
      })
      setModal(!modal)
      if(modal){
        setSelectedEvent(event);
        document.getElementById("eventPopup").setAttribute('style', "display: flex");
      }else{
        document.getElementById("eventPopup").setAttribute('style', "display: none");
        
      }
    }
    
    const handleAddEventClick = () => {
      Backend.GetAccountInfo().then(result => {
        if(result != null){
          setUser(result);
          setModal(!modal);
          if(modal){
            document.getElementById("addeventPopup").setAttribute('style', "display: flex");
          }else{
            document.getElementById("addeventPopup").setAttribute('style', "display: none");
          }
        }else{
          window.alert("please sign in before trying to add an event")
        }
      }).catch(error => {
        console.error(error);
      });
      
      
    }

    return (
        <div className='full-screen-calendar'>
          <button id="AddEventButton" onClick={handleAddEventClick}>Add Event</button>
          <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEventClick}
              style={{ padding: '10px' }}
          />
          
          <GetEvent ev={selectedEvent} currentUser={user} onClick={handleEventClick} />
          <AddEvent currentUser={user} onClick={handleAddEventClick}/>
        </div>
    );
};

export default InteractiveCalendar;