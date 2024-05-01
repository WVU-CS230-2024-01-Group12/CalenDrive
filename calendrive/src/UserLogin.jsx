import backend from "./Backend";
/**
 * Renders a login component based on the user's authentication status
 * @returns {JSX.element} The login component
 */
function UserLogin() {
  const accountInfo = backend.GetAccountInfo();

  if (accountInfo != null) {
    // We're logged in, display our name and a logout button
    return (
      <div>
        <h2>{accountInfo.name}</h2>
        <button onClick={backend.Logout}>Logout</button>
      </div>
    );
  }

  // We're not logged in, give a login button
  return (
    <button onClick={backend.RedirectToAuthenticationUrl}>
      Login with Google
    </button>
  );
}

export default UserLogin;
