import React from 'react';

import './TimePicker.css';

const TimePicker = ({
	category,
	onSelect
}) => {
	const time = new Date();
	const hhmm = `${time.getHours()}:${time.getMinutes()}`;

	const handleSelected = evt => {
		const selected = evt.target.value;
		const now = new Date();
		const h = selected.split(':').shift();
		const m = selected.split(':').pop();
		const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m).getTime();
		onSelect(timestamp);
		return timestamp;
	}

	// this is dumb, but apparently needed:
	// Android: onChange fires when you click done, not every time you change the thing;
	// iOS: onChange fires everytime you change the input. When you click set, it blurs the time input
	// Therefore, we check which browser we're using so we can handle the event correctly.
	const handleChange = evt => {
		evt.preventDefault();
		if (navigator.appVersion.includes('iPhone')) {
			return;
		}
		handleSelected(evt);
	}

	const handleBlur = evt => {
		evt.preventDefault();
		if (navigator.appVersion.includes('Android')) {
			return;
		}
		handleSelected(evt);
	}

	return (
		<input
			id={ `${category}-time-picker` }
			type="time"
			className="time-picker"
			onBlur={ handleBlur }
			onChange={ handleChange }
			value={ hhmm } />
	);
}

export default TimePicker;