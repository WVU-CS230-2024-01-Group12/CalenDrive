import axios from 'axios';

const Backend = {};
const BACKEND_BASE = "http://localhost:8800";

Backend.RedirectToAuthenticationUrl = function() {
    const authenticationUrl = new URL("/authenticate_url", BACKEND_BASE);

    window.location.assign(authenticationUrl);
}

Backend.OAuth2Callback = async function(authCode) {
    const authCodeEncoded = encodeURIComponent(authCode);

    return await axios.put(BACKEND_BASE + "/oauth2callback/" + authCodeEncoded);
}

export default Backend;