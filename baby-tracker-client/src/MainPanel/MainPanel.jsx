import React from 'react';
import cs from 'classnames';

import './MainPanel.css';

class MainPanel extends React.Component {
	render() {
		return (
			<div className={ cs('main-panel', this.props.type)}>
				Inside the main panel.
				{ this.props.type }
			</div>
		)
	}
};

export default MainPanel;