import Nav from '../Navbar/Nav.js'

function EditEvent() {
    return (
        <>
            <Nav />
            <h1>Event Editor</h1>
            <div style={{display:'flex', flexDirection: 'column', width: "30vw", alignItems: 'center'}}>
            <input type = "text" placeholder = "Event Name" name = "title"></input>
            <input type = "text" placeholder = "Event Desc" name = "desc"></input>
            <input type = "date" name = "price"></input>
            <input type = "date" name = "cover"></input>
            <button className = "formButton">Done</button>
            </div>
        </>
    );
}

export default EditEvent;