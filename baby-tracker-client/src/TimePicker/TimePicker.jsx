import React, { useState } from 'react';

import './TimePicker.css';

const TimePicker = ({
	category,
	onSelect
}) => {
	const [date, setDate] = useState(new Date());
	let hhmm = `${date.getHours()}:${date.getMinutes()}`;

	// this is dumb, but apparently needed:
	// Android: onChange fires when you click done, not every time you change the thing;
	// iOS: onChange fires everytime you change the input. When you click set, it blurs the time input
	// Therefore, we check which browser we're using so we can handle the event correctly.
	const handleInput = evt => {
		evt.preventDefault();
		const selected = evt.target.value;
		const [h, m] = selected.split(':');
		hhmm = `${h}:${m}`;
		const now = new Date();
		const newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
		setDate(newDate);

		if (navigator.appVersion.includes('iPhone') || !navigator.appVersion.includes('Chrome')) {
			return;
		}
		onSelect(newDate.getTime());
	}

	const handleBlur = evt => {
		evt.preventDefault();
		if (navigator.appVersion.includes('Android')) {
			return;
		}
		onSelect(date.getTime());
	}

	return (
		<input
			id={ `${category}-time-picker` }
			type="time"
			className="time-picker"
			onBlur={ handleBlur }
			onInput={ handleInput }
			value={ hhmm } />
	);
}

export default TimePicker;