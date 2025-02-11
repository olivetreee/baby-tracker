import React from 'react';
import cs from 'classnames';
import { sortBy } from 'lodash/fp';

import secureFetch from '../fetch';
import {
	printHoursAndMinutesFromDiff,
	printHoursAndMinutesFromDate,
	categories,
	expectedQuantities,
	hoursToMs
} from '../utils';
import PanelCard from '../PanelCard/PanelCard';
import AddButton from '../AddButton/AddButton';
import RemoveButton from '../RemoveButton/RemoveButton';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import './MainPanel.css';

const mockData = {
	feed: {
		"statusCode": 200,
		"items": [
			{
				"category": "feed",
				"timestamp": 1551701678568
			},
			{
				"category": "feed",
				"timestamp": 1551701778568
			},
			{
				"category": "feed",
				"timestamp": Date.now() - 3600000
			}
		]
	},
	poop: {
		"statusCode": 200,
		"items": [
			{
				"category": "poop",
				"timestamp": 1551701678568
			},
			{
				"category": "poop",
				"timestamp": 1552032515660
			}
		]
	},
	pee: {
		"statusCode": 200,
		"items": [
			{
				"category": "pee",
				"timestamp": 1551701678568
			},
			{
				"category": "pee",
				"timestamp": 1551701778568
			},
			{
				"category": "pee",
				"timestamp": 1551701978568
			},
			{
				"category": "pee",
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
		this._isMounted = false;
		this.renderNextPeriod = this.renderNextPeriod.bind(this);
		this.renderPast24h = this.renderPast24h.bind(this);
		this.renderLastTime = this.renderLastTime.bind(this);
		this.renderIcon = this.renderIcon.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
		this.setState({ loading: true });
		const fromTimestamp = Date.now() - hoursToMs(24);
		const querystring = `category=${this.props.category}&fromTimestamp=${fromTimestamp}`
		secureFetch({querystring})
			.then(async res => {
				if (!this._isMounted) {
					return;
				}
				try {
					const data = await res.json();
					const sortedData = sortBy('timestamp', data);
					this.setState({
						items: sortedData,
						loading: false
					});
				} catch (err) {
					throw(err);
				}
			}).catch(err => {
				this.setState({
					loading: false
				});
				console.log('Error fetching data:', err)
			});
		// const sortedData = sortBy('timestamp', mockData[this.props.category].items);
		// setTimeout(() => this.setState({
		// 	loading: false,
		// 	items: sortedData
		// }), 2000);
	}

	onAdd(item) {
		this.setState(prevState => ({ items: prevState.items.concat([item]) }));
	}

	onRemove() {
		this.setState(prevState => ({ items: prevState.items.slice(0, prevState.items.length - 1) }));
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

	renderNextPeriod() {
		const { category } = this.props;
		const { items } = this.state;
		if (category !== categories.feed || !items || !items.length) {
			return;
		}
		const timestamp = items[items.length - 1].timestamp;
		const timeDiffInMins = Math.ceil((Date.now() - timestamp)/60000);
		return (
			<PanelCard
				title="Since last feeding"
				body={ printHoursAndMinutesFromDiff(timeDiffInMins) } />
		);
	}

	renderPast24h() {
		const { items } = this.state;
		const { category } = this.props;
		if (!items) {
			return;
		}
		return (
			<PanelCard
				title="Past 24h"
				body={ items.length }
				expected={ expectedQuantities[category] } />
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
						{ this.renderNextPeriod() }
						{ this.renderPast24h() }
						{ this.renderLastTime() }
					</div>
					<div className="buttons">
						<AddButton category={ category } onAdd={ this.onAdd } />
						<RemoveButton
							item={ this.state.items[this.state.items.length - 1] }
							onRemove={ this.onRemove }
						/>
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