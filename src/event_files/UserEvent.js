
import './UserEvent.css';

/*
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
*/

export function GetEvent({ev, onClick}){
  

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


