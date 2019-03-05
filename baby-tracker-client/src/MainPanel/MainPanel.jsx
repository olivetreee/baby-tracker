import React from 'react';
import cs from 'classnames';
import { sortBy } from 'lodash/fp';

import {
	hoursToMs,
	printHoursAndMinutesFromDiff,
	printHoursAndMinutesFromDate,
	categories
} from '../utils';
import PanelCard from '../PanelCard/PanelCard';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

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
			items: [],
			loading: false
		};
		this.renderNextTime = this.renderNextTime.bind(this);
		this.renderPast24h = this.renderPast24h.bind(this);
		this.renderLastTime = this.renderLastTime.bind(this);
		this.renderIcon = this.renderIcon.bind(this);
	}

	componentDidMount() {
		const fromTimestamp = Date.now() - hoursToMs(24);
		this.setState({ loading: true });
		// fetch(
		// 	`URL=${this.props.category}&fromTimestamp=${fromTimestamp}`
		// ).then(async res => {
		// 	try {
		// 		const data = await res.json();
		// 		const sortedData = sortBy('timestamp', data.items);
		// 		this.setState({
		// 			items: sortedData,
		// 			loading: false
		// 		});
		// 	} catch (err) {
		// 		throw(err);
		// 	}
		// }).catch(err => {
		// 	this.setState({
		// 		loading: false
		// 	});
		// 	console.log('Error fetching data:', err)
		// });
		setTimeout(() => this.setState({ loading: false }), 2000);
		const sortedData = sortBy('timestamp', mockData[this.props.category].items);
		this.setState({ items: sortedData });
	}

	renderIcon() {
		const categoryIconMap = {
			[categories.feed]: 'wine-bottle',
			[categories.poop]: 'poo',
			[categories.pee]: 'tint'
		}
		const { category } = this.props;
		return (
			<div className="background-icon">
				<i className={`fas fa-${categoryIconMap[category]}`}></i>
			</div>
		)
	}

	renderNextTime() {
		const { category } = this.props;
		const { items } = this.state;
		if (category !== categories.feed || !items || !items.length) {
			return;
		}
		const timestamp = items[items.length - 1].timestamp;
		const nextFeeding = timestamp + hoursToMs(3);
		const timeDiffInMins = Math.ceil((nextFeeding - Date.now())/60000);
		// TODO render in red if passed
		return (
			<PanelCard
				title="Next feeding in"
				body={ printHoursAndMinutesFromDiff(timeDiffInMins) } />
		);
	}

	renderPast24h() {
		const { items } = this.state;
		if (!items) {
			return;
		}
		return (
			<PanelCard
				title="Past 24h"
				body={ items.length } />
		);
	}

	renderLastTime() {
		const { items } = this.state;
		const { category } = this.props;
		if (!items || !items.length) {
			return;
		}
		const timestamp = items[items.length - 1].timestamp;
		return (
			<PanelCard
				title={ `Last ${category} at` }
				body={ printHoursAndMinutesFromDate(timestamp) } />
		);
	}

	render() {
		const { category } = this.props;
		const { loading } = this.state;
		const content = loading
			? <LoadingIndicator />
			: (
				<React.Fragment>
					<div className="info">
						{ this.renderNextTime() }
						{ this.renderPast24h() }
						{ this.renderLastTime() }
					</div>
					<div className="log-button">
						<i className="fas fa-plus-circle"></i>
					</div>
				</React.Fragment>
			)
		return (
			<div className={ cs('main-panel', category)}>
				{ this.renderIcon() }
				{ content }
			</div>
		)
	}
};

export default MainPanel;