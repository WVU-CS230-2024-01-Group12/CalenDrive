import Nav from '../Navbar/Nav';
import backend from '../Backend';

function Profile() {
    const accountInfo = backend.GetAccountInfo();
    let accountView;

    if (accountInfo == null) {
        accountView = (
            <div>
                <h1>Not logged in</h1>
            </div>
        );
    } else {
        accountView = (
            <div>
                <h1>{accountInfo.name}</h1>
                <h2>Your Events</h2>
                <ul>
                    <li>Event 1</li>
                    <li>Event 2</li>
                    <li>Event 3</li>
                </ul>
            </div>
        );
    }

    return (
        <div>
            <Nav/>
            {accountView}
        </div>
    )
}

export default Profile;