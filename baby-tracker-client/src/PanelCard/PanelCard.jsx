import React from 'react';

import './PanelCard.css';

const PanelCard = ({ title, body }) => (
	<div className="panel-card">
		<div className="title">
			{ title }
		</div>
		<div className="body">
			{ body }
		</div>
	</div>
);

export default PanelCard;