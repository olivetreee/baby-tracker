import React, { useState } from 'react';

import './TimePicker.css';

const TimePicker = ({
	category,
	onSelect
}) => {
	const [date, setDate] = useState(new Date());

	// this is dumb, but apparently needed:
	// Android: onChange fires when you click done, not every time you change the thing;
	// iOS: onChange fires everytime you change the input. When you click set, it blurs the time input
	// Therefore, we check which browser we're using so we can handle the event correctly.
	const handleInput = evt => {
		evt.preventDefault();
		const selected = evt.target.value;
		const newDate = new Date(selected);
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
			type="datetime-local"
			className="time-picker"
			onBlur={ handleBlur }
			onInput={ handleInput } />
	);
}

export default TimePicker;