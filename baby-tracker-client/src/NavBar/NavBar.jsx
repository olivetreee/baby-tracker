import React from 'react';

import './NavBar.css';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'dashboard'
		};
	}

	render() {
		return(
			<div className="nav-bar">
				<div>
					Dashboard
				</div>
				<div>
					Table
				</div>
			</div>
		)
	}
}

export default NavBar;