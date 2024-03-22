
import './UserEvent.css';

class UserEvent {
    constructor(name, date, time, location, poster){
        this.name = name;
        this.date = date;
        this.time = time;
        this.location = location;
        this.poster = poster;
        this.tags = [];
    }

    addTag(tag) {
        this.tags.push(tag);
    }

    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }
}

export const event = new UserEvent("[EventTitle]", "[SampleDate]", "[SampleTime]", "[SampleLocation]", "[SamplePoster]");

export function GetEvent(props){
  
  let modal = false;

  function toggleModal() {
    modal = !modal;
    if(modal){
      document.getElementById("eventPopup").setAttribute('style', "display: flex");

    }else{
      document.getElementById("eventPopup").setAttribute('style', "display: none");

    }
  }

  return(
    <>
      <button id="openEvent" className="modalButton" onClick={toggleModal}>Open Event</button>

      <div id="eventPopup" className="eventModal">
      	<div className="closeEvent" onClick={toggleModal}>&times;</div>
        <div className="eventContent">
          <div className="eventHeader">
            <h1>
              {props.ev.name}
            </h1>
          </div>
          <div className="eventBody">
            Some Content...
          </div>
					<div className="buttons">
            <button id="rsvpButton" className="rsvp">RSVP</button>
          </div>
        </div>

      </div>
    </>
  )
}


