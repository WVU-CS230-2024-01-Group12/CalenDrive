import axios from 'axios';

const Backend = {};
const BACKEND_BASE = "http://localhost:8800";

// Required for our session cookie to be sent with every request
axios.defaults.withCredentials = true;

Backend.RedirectToAuthenticationUrl = function() {
    const authenticationUrl = new URL("/authenticate_url", BACKEND_BASE);

    window.location.assign(authenticationUrl);
}

Backend.Logout = async function() {
    await axios.get(BACKEND_BASE + "/logout");
}

Backend.OAuth2Callback = async function(authCode) {
    const authCodeEncoded = encodeURIComponent(authCode);

    return await axios.post(BACKEND_BASE + "/oauth2callback/" + authCodeEncoded);
}

// Requests our account information from the backend
// Returns null if it failed for any reason, such as not being logged in
Backend.GetAccountInfo = async function() {
    let response = await axios.get(BACKEND_BASE + "/account_info");
    let accountInfo = response.data;

    if (accountInfo.result !== "Success")
        return null;

    return accountInfo;
}

export default Backend;