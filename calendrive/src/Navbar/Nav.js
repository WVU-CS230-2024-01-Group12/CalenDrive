import "./Nav.css"
import React, { useState } from 'react';
import StyledLink from "./StyledLink";
import UserLogin from "../UserLogin"

function Nav() {
    const [backgroundColor, setBackgroundColor] = useState(""); 

    const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        setBackgroundColor(selectedColor);
    };

    return (
        <div className="navbar" style={{ backgroundColor: backgroundColor }}>
            <StyledLink to="/"><div className="navigate"><img src="calendriveLogo.png" alt="Calendrive logo"/></div></StyledLink>
            <StyledLink to="/edit-event"><div className="navigate">Edit Events</div></StyledLink>
            <StyledLink to="/"><div className="navigate">Profile</div></StyledLink>
            <UserLogin />
        
            <div className="dropdown">Change Theme:
                <button className="dropbtn"> 
                    <i className="fa fa-caret-down"></i>
                    <select id="themeSelector" onChange={handleColorChange}>
                        <option value="#808080">Gray</option>
                        <option value="#ff0000">Red</option>
                        <option value="#008000">Green</option>
                        <option value="#0000ff">Blue</option>
                        <option value="#8A2BE2">Purple</option>
                        <option value="#FF69B4">Pink</option>
                    </select>
                </button>
            </div>
        </div>
    );
}

export default Nav;