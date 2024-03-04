class Event {
    Event(date, time, location, poster){
        this.date = date;
        this.time = time;
        this.location = location;
        this.poster = poster;
        this.tags = new Array();
    }

    addTag(tag) {
        this.tags.push(tag);
    }

    removeTag(tag) {
        this.tags.splice(tags.indexOf(tag), 1);
    }

    get tags() {
        return this.tags;
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

    set location(location){
        this.location = location;
    }
}