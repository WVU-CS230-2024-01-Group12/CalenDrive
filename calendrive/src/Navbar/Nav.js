import "./Nav.css"
import StyledLink from "./StyledLink";
import UserLogin from "../UserLogin"

function Nav() {
    return(
        <div className="navbar">
            <StyledLink to="/"><div className="navigate"><img src="calendriveLogo.png" alt="Calendrive logo"/></div></StyledLink>
            <StyledLink to="/edit-event"><div className="navigate">Edit Events</div></StyledLink>
            <StyledLink to="/"><div className="navigate">Profile</div></StyledLink>
            <UserLogin />
        </div>
    );
}

export default Nav;