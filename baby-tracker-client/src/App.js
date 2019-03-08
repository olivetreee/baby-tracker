import React, { Component } from 'react';
import history from './history';
import MainPanel from './MainPanel/MainPanel';
import NavBar from './NavBar/NavBar';
import './App.css';

class App extends Component {
	componentDidMount() {
		const { isAuthenticated } = this.props.auth;
		// if (!isAuthenticated()) {
		// 	history.replace('/login');
		// }
	}
  render() {
    return (
      <div className="App">
				<div className="panels">
					<MainPanel category="feed" />
					<MainPanel category="poop" />
					<MainPanel category="pee" />
				</div>
				<NavBar />
      </div>
    );
  }
}

export default App;
