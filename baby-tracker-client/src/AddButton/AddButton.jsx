import React from 'react';
import secureFetch from '../fetch';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import './AddButton.css';

class AddButton extends React.Component {
	constructor() {
		super();
		this.logCategory = this.logCategory.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
		this.state = {
			loading: false,
			success: false,
			error: false
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

	logCategory() {
		const { category } = this.props;
		const body = {
			category,
			timestamp: Date.now()
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
		return (
			<div className="log-button">
				{ iconToUse }
			</div>
		)
	}
}

export default AddButton;