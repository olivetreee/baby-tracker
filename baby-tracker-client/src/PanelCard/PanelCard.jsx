import React from 'react';

import './PanelCard.css';

const PanelCard = ({ title, body, expected }) => (
	<div className="panel-card">
		<div className="title">
			{ title }
		</div>
		<div className="body">
			{ body }
			{
			expected &&
				<span className="expected-quantity">
					/ { expected }
				</span>
		}
		</div>
	</div>
);

export default PanelCard;