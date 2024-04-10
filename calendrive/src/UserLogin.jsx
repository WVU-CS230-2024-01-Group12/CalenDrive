import backend from './Backend';

function UserLogin() {
  return (
    <div>
      <button onClick={backend.RedirectToAuthenticationUrl}>Login with Google</button>
    </div>
  )
}

export default UserLogin;