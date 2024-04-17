import InteractiveCalendar from '../InteractiveCalendar.js';
import Nav from '../Navbar/Nav.js'

function MainPage() {
    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Nav/>
            <InteractiveCalendar />
        </div>
    );
}

export default MainPage;