import { useState } from 'react';
import Nav from "../Navbar/Nav";
import { GetEvent } from "../event_files/UserEvent.js";
import backend from "../Backend";

function Profile() {
  const accountInfo = backend.GetAccountInfo();
  let accountView;
  
  const [ userEvents, setUserEvents ] = useState(null);
  const [ selectedEvent, setSelectedEvent ] = useState({});

  if (userEvents == null) {
    backend.GetEvents().then(events => {
      const userEventList = [];

      for (let event of events) {
        if (event.poster === accountInfo.name || event.poster === accountInfo.email)
          userEventList.push(event);
      }

      setUserEvents(userEventList);
    });
  }

  if (accountInfo == null) {
    accountView = (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  } else {
    const eventItems = [];

    if (userEvents != null) {
      for (let event of userEvents) {
        eventItems.push(
          <li><button onClick={() => {setSelectedEvent(event); document.getElementById("eventPopup").setAttribute("style", "display: flex");}}>{event.title}</button></li>
        )
      }
    }

    accountView = (
      <div>
        <h1>{accountInfo.name}</h1>
        <h2>Your Events</h2>
        <ul id="userEventsList">
          {eventItems}
        </ul>

        <GetEvent ev={selectedEvent} currentUser={accountInfo} onClick={() => document.getElementById("eventPopup").setAttribute("style", "display: none")}/>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      {accountView}
    </div>
  );
}

export default Profile;
