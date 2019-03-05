import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = () => (
	<div className="loading-indicator">
		<span className="fa-stack">
			<i className="fas fa-circle-notch fa-stack-2x fa-spin"></i>
			<i className="fas fa-baby fa-stack-1x"></i>
		</span>
	</div>
)

export default LoadingIndicator;
