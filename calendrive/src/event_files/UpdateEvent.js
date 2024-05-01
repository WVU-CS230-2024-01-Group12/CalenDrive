import React from 'react';
import axios from 'axios';
import './AddEvent.css';
import { useState } from 'react';
import './UpdateEvent.css';
import AddressBar from '../address_autocomplete/AddressBar';

export function UpdateEvent({onClick, ev}){

const [event, setevent] = useState({
    name: "",
    desc: "",
    address: "",
    lat: 0,
    lon: 0,
    start: "",
    end: "",
    poster: ev.poster,
    rsvp: ev.rsvp
});

const handleChange = (e) => {
    setevent(prev=>({...prev, [e.target.name]: e.target.value}));
};

const handleSubmit = async e => {
e.preventDefault();
try {
  await axios.put("http://localhost:8800/events/"+ev.id, event)
  window.location.reload()
}catch(err){
return(err)
}
};

 
  return(
    <>

      <div id="editeventPopup" className="eventModal">
      	<div className="closeEvent" onClick={onClick}>&times;</div>
        <div className="eventContent">
          <div className="eventHeader">
            <h1>
              Update {ev.title}
            </h1>
          </div>
          <div className="eventBody">
           <div className="form">
            <input type="text" id="name" name="name" placeholder="Event Name" onChange={handleChange} required/>
            <AddressBar onTest = {(val) => setevent(val) }/>     
            <input type="text" id="desc" name="desc" placeholder="Event Description" onChange={handleChange}/>
            <input type="datetime-local" id="start" name="start" onChange={handleChange} required/>
            <input type="datetime-local" id="end" name="end" onChange={handleChange} required/>
           </div>
          </div>
			<div className="buttons">
            <button id="EditSubmitButton" className="EditSubmitButton" onClick={handleSubmit}>Update Event</button>  
          </div>
        </div>

      </div>
    </>
  )

  }

