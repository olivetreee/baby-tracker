import React from 'react';
import secureFetch from '../fetch';
import TimePicker from '../TimePicker/TimePicker';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import './AddButton.css';

class AddButton extends React.Component {
	constructor() {
		super();
		this.logCategory = this.logCategory.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
		this.openTimePicker = this.openTimePicker.bind(this);
		this.state = {
			loading: false,
			success: false,
			error: false,
			time: 0
		}
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleResponse(success, error) {
		if (!this._isMounted) {
			return;
		}
		this.setState({ loading: false, success, error });
		setTimeout(() => {
			if (!this._isMounted) {
				return;
			}
			this.setState({ success: false, error: false })
		}, 3000);
	}

	openTimePicker() {
		const { category } = this.props;
		// document.getElementById('log-button').blur();
		// document.getElementById(`${category}-time-picker`).focus().click();
		document.getElementById(`${category}-time-picker`).focus();
		document.getElementById(`${category}-time-picker`).click();
	}

	logCategory(timestamp) {
		const { category } = this.props;
		const body = {
			category,
			timestamp
		}
		this.setState({ loading: true });
		secureFetch({ method: 'POST', body })
			.then(() => this.handleResponse(true, false))
			.catch(() => this.handleResponse(false, true))
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="log-button">
					<LoadingIndicator />
				</div>
			)
		}
		let iconToUse = <i className="fas fa-plus-circle"></i>;
		if (this.state.success) {
			iconToUse = <i className="fas fa-check-circle"></i>
		} else if (this.state.error) {
			iconToUse = <i className="fas fa-times-circle"></i>
		}

		const timePicker = <input id={ `${this.props.category}-time-picker` } className="time-picker" type="time" />;
		window.tp = timePicker;
		return (
			<div>
				<TimePicker
					category={ this.props.category }
					onSelect={ this.logCategory } />
				<button
					className="log-button"
					id="log-button"
					onClick={ this.openTimePicker } >
					{ iconToUse }
				</button>
			</div>
		)
	}
}

export default AddButton;