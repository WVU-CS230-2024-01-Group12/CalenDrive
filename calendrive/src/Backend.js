import axios from "axios";

const Backend = {};
const BACKEND_BASE = "http://localhost:8800";

// Required for our session cookie to be sent with every request
axios.defaults.withCredentials = true;

Backend.RedirectToAuthenticationUrl = function () {
  const authenticationUrl = new URL("/authenticate_url", BACKEND_BASE);

  window.location.assign(authenticationUrl);
};

/**
 * Handles logging out the user from the website
 */
Backend.Logout = async function () {
  await axios.get(BACKEND_BASE + "/logout");
  sessionStorage.removeItem("account_info");
  window.location.reload();
};

/**
 * Handles OAuth callback after authentication
 * @param {*} authCode User's authentication code recieved from OAuth
 * @param {*} navigate Function to navigate to main page
 */
Backend.OAuth2Callback = function (authCode, navigate) {
  const authCodeEncoded = encodeURIComponent(authCode);
  const callback = axios.post(
    BACKEND_BASE + "/oauth2callback/" + authCodeEncoded
  );

  callback.then(async (result) => {
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
};

/**
 * Gets account information from session storage
 * @returns JSON of account info
 */
Backend.GetAccountInfo = function () {
  return JSON.parse(sessionStorage.getItem("account_info"));
};

/**
 * Gets the list of events on the calendar
 * @returns Array of events returned from the backend
 */
Backend.GetEvents = async function () {
  try {
    const response = await axios.get(BACKEND_BASE + "/events");

    return response.data.map((event) => ({
      id: event.id,
      title: event.name,
      description: event.desc,
      address: event.address,
      lat: event.lat,
      lon: event.lon,
      start: new Date(event.start),
      end: new Date(event.end),
      poster: event.poster,
      rsvp: event.rsvp,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default Backend;
