import axios from 'axios';
import './UserEvent.css';
import { useState, useEffect } from 'react';
import { UpdateEvent } from './UpdateEvent';

export function GetEvent({ev, onClick, currentUser}){

const moderators =["Alexander White", "Stephanie Kish", "Simon Hale", "Logan Parish", "Kyle Shumaker", "Seth McBee"]
const [event, setEvent] = useState({
  name: ev.title,
  desc: ev.description,
  address: ev.address,
  lat: ev.lat,
  lon: ev.lon,
  start: ev.start,
  end: ev.end,
  poster: ev.poster,
  rsvp: ev.rsvp
});

const handleDelete = async (id) => {
try {
  await axios.delete("http://localhost:8800/events/"+id)
  window.location.reload()
} catch (err) {
 console.log(err)
}};

const [modal, setModal] = useState(false);

useEffect(() => {
  if (modal) {
    document.getElementById("editeventPopup").setAttribute('style', "display: flex");
  } else {
    document.getElementById("editeventPopup").setAttribute('style', "display: none");
  }
}, [modal]);

const handleRSVP = async (id) => {
  try {
   let newEvent = {
    ...ev,
    name: ev.title,
    desc: ev.description,
    rsvp: ev.rsvp + 1
  };
    setEvent(newEvent);
    await axios.put( "http://localhost:8800/events/"+ev.id, newEvent)
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
};

const handleEditClick = () => {
  setModal(!modal);
};
 
  return(
    <>

      <div id="eventPopup" className="eventModal">
      	<div className="closeEvent" onClick={onClick}>&times;</div>
        <div className="eventContent">
          <div className="eventHeader">
            <h1>
              {ev.title}
            </h1>
          </div>
          <div className="eventBody">
            <h3> {ev.address}</h3>
            <h5> Attendees: {ev.rsvp}</h5>
            <p> {ev.description}</p>
            <p> {new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleString()} </p>
          </div>
					<div className="buttons">
            <button id="rsvpButton" className="rsvp" onClick={handleRSVP}>RSVP</button>
            {(ev.poster === currentUser.name || moderators.includes(currentUser.name)) && <button id="editButton" className="edit" onClick={handleEditClick}>Edit</button>}
            {(ev.poster === currentUser.name || moderators.includes(currentUser.name)) && <UpdateEvent onClick={handleEditClick} ev={ev}/>}
            {(ev.poster === currentUser.name || moderators.includes(currentUser.name)) && <button id="deleteButton" className="delete" onClick={()=>handleDelete(ev.id)}>Delete</button>}
          </div>
        </div>
        <UpdateEvent ev={ev} onClick={handleEditClick}/>
      </div>
    </>
  )
}


