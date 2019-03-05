import React from 'react';
import cs from 'classnames';

import './MainPanel.css';

const mockData = {
	feed: {
		"statusCode": 200,
		"items": [
			{
				"category": "feed",
				"latest": "true",
				"timestamp": 1551701678568
			},
			{
				"category": "feed",
				"latest": "true",
				"timestamp": 1551701778568
			},
			{
				"category": "feed",
				"latest": "true",
				"timestamp": 1551779318358
			}
		]
	},
	poop: {
		"statusCode": 200,
		"items": [
			{
				"category": "poop",
				"latest": "true",
				"timestamp": 1551701678568
			},
			{
				"category": "poop",
				"latest": "true",
				"timestamp": 1551825346566
			}
		]
	},
	pee: {
		"statusCode": 200,
		"items": [
			{
				"category": "pee",
				"latest": "true",
				"timestamp": 1551701678568
			},
			{
				"category": "pee",
				"latest": "true",
				"timestamp": 1551701778568
			},
			{
				"category": "pee",
				"latest": "true",
				"timestamp": 1551701978568
			},
			{
				"category": "pee",
				"latest": "true",
				"timestamp": 1551702978568
			}
		]
	}
}


class MainPanel extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {}
		};
		this.renderNextTime = this.renderNextTime.bind(this);
	}

	componentDidMount() {
		// fetch(
		// 	`URL.GOES.HERE?category=${this.props.category}`
		// ).then(async res => {
		// 	try {
		// 		const data = await res.json();
		// 		console.log(res);
		// 		console.log(data);
		// 	} catch (err) {
		// 		throw(err);
		// 	}
		// }).catch(err => console.log('@@@err', err));
		const mockData = {
			"statusCode": 200,
			"item": {
				"category": "feed",
				"latest": "true",
				"timestamp": 1551701678568
			}
		}
		this.setState({ data: mockData });
	}

	renderNextTime() {
		const { data } = this.state;
		if (!data.item) {
			return;
		}
		const timestamp = data.item.timestamp;
		const nextFeeding = timestamp + 3 * 60 * 60 * 1000;
		const timeDiff = nextFeeding - new Date().getTime();
		return (
			<div>
				{ new Date(timeDiff).getMinutes() } minutes until next feeding.
			</div>
		)
	}

	render() {
		const item = this.state.data.item;
		return (
			<div className={ cs('main-panel', this.props.category)}>
				Inside the main panel.
				{ this.props.category }
				{
					item && item.category === 'feed' &&
					this.renderNextTime()
				}
			</div>
		)
	}
};

export default MainPanel;