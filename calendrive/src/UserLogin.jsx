import React from 'react';
import backend from './Backend';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountInfo: null
    }

    backend.GetAccountInfo().then(info => {
      if (info == null)
        return;

      this.setState({accountInfo: info});
    });
  }

  render() {
    let component = this;

    function logout() {
      backend.Logout().then(() => {
        component.setState({accountInfo: null});
      });
    }

    if (this.state.accountInfo != null) {
      // We're logged in, display our name and a logout button
      return (
        <div>
            <h2>{this.state.accountInfo.name}</h2>
            <button onClick={logout}>Logout</button>
        </div>
      );
    }

    // We're not logged in, give a login button
    return <button onClick={backend.RedirectToAuthenticationUrl}>Login with Google</button>
  }
}

export default UserLogin;