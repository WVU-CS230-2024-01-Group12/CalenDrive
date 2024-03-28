import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const InteractiveCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8800/events');
            setEvents(response.data.map(event => ({
                id: event.id,
                title: event.name,
                start: new Date(event.start),
                end: new Date(event.end),
                description: event.description,
                address: event.address
            })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return (
        <div style={{ height: '600px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ padding: '10px' }}
            />
        </div>
    );
};

export default InteractiveCalendar;
