import React from 'react';
import axios from 'axios';
import './UserEvent.css';
import { useState } from 'react';
import { UpdateEvent } from './UpdateEvent';

export function GetEvent({ev, onClick, currentUser}){

const moderators =["Alexander White", "Stephanie Kish", "Simon Hale", "Logan Parish", "Kyle Shumaker", "Seth McBee"]

const handleDelete = async (id) => {
try {
  await axios.delete("http://localhost:8800/events/"+id)
  window.location.reload()
} catch (err) {
 console.log(err)
}};

const [modal, setModal] = useState(false);

const handleEditClick = () => {
  setModal(!modal);
  if (modal) {
    document.getElementById("editeventPopup").setAttribute('style', "display: flex");
  } else {
    document.getElementById("editeventPopup").setAttribute('style', "display: none");
  }
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
            <p> {ev.description}</p>
            <p> {new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleString()} </p>
          </div>
					<div className="buttons">
            <button id="rsvpButton" className="rsvp">RSVP</button>
            {(ev.poster === currentUser.name || moderators.includes(currentUser.name)) && <button id="editButton" className="edit" onClick={handleEditClick}>Edit</button>}
            {(ev.poster === currentUser.name || moderators.includes(currentUser.name)) && <UpdateEvent onClick={handleEditClick} ev={ev}/>}
            {(ev.poster === currentUser.name || moderators.includes(currentUser.name)) && <button id="deleteButton" className="delete" onClick={()=>handleDelete(ev.id)}>Delete</button>}
          </div>
        </div>

      </div>
    </>
  )
}


