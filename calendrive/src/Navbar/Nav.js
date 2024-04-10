import "./Nav.css"
import { Link } from "react-router-dom";
import StyledLink from "./StyledLink";

function Nav() {

    return(

        <div className="navbar">
            <StyledLink to="/"><div className="navigate"><img src="calendriveLogo.png" /></div></StyledLink>
            <StyledLink to="/edit-event"><div className="navigate">Edit Events</div></StyledLink>
            <StyledLink to="/"><div className="navigate">Profile</div></StyledLink>
        </div>
    );
}

export default Nav;