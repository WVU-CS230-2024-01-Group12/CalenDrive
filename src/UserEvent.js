export class UserEvent {
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

    get tags() {
        return this.tags;
    }

    set name(name){
        this.name = name;
    }

    get name() {
        return this.name;
    }

    set date(date) {
        this.date = date;
    }

    get date() {
        return this.date;
    }

    set time(time){
        this.time = time;
    }

    get time() {
        return this.time;
    }

    set location(location){
        this.location = location;
    }

    get location() {
        return this.location;
    }

}

export default function GetEvent(props){

    return(
    <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{props.ev.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{props.ev.name} happening on {props.ev.date} at {props.ev.time}.<br /> 
          {props.ev.name} will be at {props.ev.location} hosted by {props.ev.hoster}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}



