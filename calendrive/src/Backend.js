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
    sessionStorage.removeItem("account_info");
    window.location.reload();
}

Backend.OAuth2Callback = function(authCode, navigate) {
    const authCodeEncoded = encodeURIComponent(authCode);
    const callback = axios.post(BACKEND_BASE + "/oauth2callback/" + authCodeEncoded);

    callback.then(async result => {
        const successResult = result.data.result;

        if (successResult !== "Success") {
            console.log(successResult);
            alert("Failed to login");
        } else {
            let response = await axios.get(BACKEND_BASE + "/account_info");
            let accountInfo = response.data;

            if (accountInfo.result !== "Success") {
                sessionStorage.removeItem("account_info");
                return;
            }

            sessionStorage.setItem("account_info", JSON.stringify(accountInfo));
        }

        // Back to the main page
        navigate("/");
    });
}

Backend.GetAccountInfo = function() {
    return JSON.parse(sessionStorage.getItem("account_info"));
}

export default Backend;