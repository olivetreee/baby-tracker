import React, { Component } from 'react';
import MainPanel from './MainPanel/MainPanel';
import NavBar from './NavBar/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
				<MainPanel type="feeding" />
				<MainPanel type="poop" />
				<MainPanel type="pee" />
				<NavBar />
      </div>
    );
  }
}

export default App;
