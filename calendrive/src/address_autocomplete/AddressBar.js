import './AddressBar.css';
import React, { useState } from 'react';
import axios from 'axios';

const AddressBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setInputValue(value);
    if(value.length > 0){
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=4251848903d64182ba6a936c45db60f0`,
          { withCredentials: false }
        );
        setSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }
  };

  const handleClick = (val) => {
    setInputValue(val.properties.formatted);
    setSuggestions([]);
    props.onTest(prev=>({...prev, address: val.properties.formatted, lat: val.properties.lat, lon: val.properties.lon}));
  }

  return (
    <div className = "bar-container">
      <input
        className = "addressbar"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter an address..."
      />
      <ul className='suggestions'>
        {suggestions.map((suggestion) => (
          <li className="suggestion" onClick={() => {handleClick(suggestion)}}key={suggestion.properties.osm_id}>{suggestion.properties.formatted}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddressBar;
