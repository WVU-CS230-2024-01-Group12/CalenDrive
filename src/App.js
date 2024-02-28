import logo from './logo.svg';
import './App.css';

// AWS-Amplify
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(amplifyconfig);

function App({ signOut, user }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are logged in as {user.signInDetails.loginId}</p>
        <button onClick={signOut}>Log out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
