import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { GetEvent } from './event_files/UserEvent.js';
import './event_files/UserEvent.css';
import { Link } from 'react-router-dom';
import Nav from './Navbar/Nav.js'

const localizer = momentLocalizer(moment);

const InteractiveCalendar = () => {
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
            // Assuming the response.data is an array of event objects
            const formattedEvents = response.data.map(event => ({
                id: event.id,
                title: event.name,
                description: event.desc,
                address: event.address,
                start: new Date(event.start),
                end: new Date(event.end)
                
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const [modal, setModal] = useState(false);

    const handleEventClick = event => {
      setModal(!modal)
      if(modal){
        setSelectedEvent(event);
        document.getElementById("eventPopup").setAttribute('style', "display: flex");
      }else{
        document.getElementById("eventPopup").setAttribute('style', "display: none");
        
      }
    }

    return (
        <>
        <Nav />
        <div style={{ height: '600px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventClick}
                style={{ padding: '10px' }}
            />
                <GetEvent ev={selectedEvent} onClick={handleEventClick} />
          
        </div>
        </>
    );
};

export default InteractiveCalendar;