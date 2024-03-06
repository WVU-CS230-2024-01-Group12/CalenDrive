import './App.css';
import {GetEvent, event} from './event_files/UserEvent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <GetEvent ev = {event}/>
      </header>
    </div>
  );
}

export default App;
