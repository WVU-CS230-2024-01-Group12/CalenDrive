import React from 'react';
import axios from 'axios';
import './AddEvent.css';
import { useState } from 'react';



export function AddEvent({onClick}){

const [event, setevent] = useState({
    name: "",
    desc: "",
    address: "",
    start: "",
    end: ""
});

const handleChange = (e) => {
    setevent(prev=>({...prev, [e.target.name]: e.target.value}));

};
const handleSubmit = async e => {
e.preventDefault();
try {
  await axios.post("http://localhost:8800/events", event)
  window.location.reload()
}catch(err){
return(err)
}
};

 
  return(
    <>

      <div id="addeventPopup" className="eventModal">
      	<div className="closeEvent" onClick={onClick}>&times;</div>
        <div className="eventContent">
          <div className="eventHeader">
            <h1>
              Add New Event
            </h1>
          </div>
          <div className="eventBody">
           <div className="form">
            <input type="text" id="name" name="name" placeholder="Event Name" onChange={handleChange} required/>
            <input type="text" id="address" name="address" placeholder="Event Location" onChange={handleChange} required/>    
            <input type="text" id="desc" name="desc" placeholder="Event Description" onChange={handleChange}/>
            <input type="datetime-local" id="start" name="start" onChange={handleChange} required/>
            <input type="datetime-local" id="end" name="end" onChange={handleChange} required/>
           </div>

            
          </div>
			<div className="buttons">
            
            <button id="AddButton" className="AddButton" onClick={handleSubmit}>Add Event</button>  
          </div>
        </div>

      </div>
    </>
  )

  }
