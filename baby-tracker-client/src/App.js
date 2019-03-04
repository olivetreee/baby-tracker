import React, { Component } from 'react';
import MainPanel from './MainPanel/MainPanel';
import NavBar from './NavBar/NavBar';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: {}
		};
	}

  render() {
    return (
      <div className="App">
				<div className="panels">
					<MainPanel category="feeding" />
					<MainPanel category="poop" />
					<MainPanel category="pee" />
				</div>
				<NavBar />
      </div>
    );
  }
}

export default App;
