import React from 'react';
import secureFetch from '../fetch';
import { printHoursAndMinutesFromDate } from '../utils';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import './RemoveButton.css';

class RemoveButton extends React.Component {
	constructor() {
		super();
		this.handleResponse = this.handleResponse.bind(this);
		this.removeItem = this.removeItem.bind(this);
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

	removeItem() {
		const { item } = this.props;
		const choice = window.confirm(`Remove ${item.category} at ${printHoursAndMinutesFromDate(item.timestamp)}?`);
		if (!choice) {
			return;
		}
		const body = { ...item };
		this.setState({ loading: true });
		secureFetch({ method: 'DELETE', body })
			.then(() => {
				this.props.onRemove();
				this.handleResponse(true, false);
			})
			.catch(() => this.handleResponse(false, true))
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="remove-button">
					<LoadingIndicator />
				</div>
			)
		}
		let iconToUse = <i className="fas fa-minus-circle"></i>;
		if (this.state.success) {
			iconToUse = <i className="fas fa-check-circle"></i>
		} else if (this.state.error) {
			iconToUse = <i className="fas fa-times-circle"></i>
		}

		return (
			<div>
				<button
					className="remove-button"
					id="remove-button"
					onClick={ this.removeItem } >
					{ iconToUse }
				</button>
			</div>
		)
	}
}

export default RemoveButton;