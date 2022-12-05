import React from 'react';
import MainPanel from './MainPanel/MainPanel';
import NavBar from './NavBar/NavBar';
import './App.css';

const App = () => (
	<div className="App">
		<div className="panels">
			<MainPanel category="feed" />
			<MainPanel category="poop" />
			<MainPanel category="pee" />
		</div>
		{/* <NavBar /> */}
	</div>
);

export default App;
