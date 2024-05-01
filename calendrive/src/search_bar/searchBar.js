import "./searchBar.css";
import axios from "axios";
import { useState } from "react";

const SearchBar = (props) => {
  const [events, setEvents] = useState([]);
  const [filterBy, setFilterBy] = useState("Name");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /**
   * Function to fetch events from the server
   */
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8800/events");

      const formattedEvents = response.data.map((event) => ({
        id: event.id,
        title: event.name,
        description: event.desc,
        address: event.address,
        lat: event.lat,
        lon: event.lon,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(formattedEvents);
      console.log(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  function filterTypeSelect(e) {
    setFilterBy(e.target.outerText);
  }

  /**
   * Function to handle clicking on the search bar
   * @param {Event} e
   */
  const handleClick = (e) => {
    fetchEvents();
    setSuggestions([]);
  };

  /**
   * Function to handle selecting an event by ID
   *
   * Displays event information if event is found
   *
   * If the event is not found, triggers refetch of events
   * @param {*} eventId ID of the event selected
   */
  const eventSelect = (eventId) => {
    const selectedEvent = events.find((event) => event.id === eventId);
    if (selectedEvent) {
      const eventInfo = `Title: ${selectedEvent.title}\nDescription: ${
        selectedEvent.description
      }\nAddress: ${
        selectedEvent.address
      }\nStart: ${selectedEvent.start.toString()}\nEnd: ${selectedEvent.end.toString()}`;
      window.alert(eventInfo);
    } else {
      // If event is not found, refetch events to ensure we have the latest data
      fetchEvents();
    }
  };

  /**
   * Handles changes to form input fields
   *
   * Updates the input value and filters event suggestions based on the provided value
   * @param {Event} e Input event value
   */
  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setSuggestions([]);
    events.forEach((event) => {
      if (filterBy === "Name") {
        if (event.title.toLowerCase().includes(val.toLowerCase())) {
          setSuggestions((prevSuggestions) => [...prevSuggestions, event]);
        }
      }
    });
  };

  return (
    <div>
      <form className="searchContainer">
        <input
          className="searchBar"
          value={inputValue}
          type="text"
          placeholder={filterBy + "..."}
          onClick={handleClick}
          onChange={(e) => handleChange(e)}
        ></input>
        <ul className="evsuggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="suggestion"
              onClick={() => eventSelect(suggestion.id)}
            >
              {" "}
              {suggestion.title}{" "}
            </li>
          ))}
        </ul>

        <button type="button" className="selectFilter">
          Search By:
          <ul className="filters">
            <li onClick={(e) => filterTypeSelect(e)}>Name</li>
            <li onClick={(e) => filterTypeSelect(e)}>Address</li>
            <li onClick={(e) => filterTypeSelect(e)}>Date</li>
            <li onClick={(e) => filterTypeSelect(e)}>Time</li>
          </ul>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
