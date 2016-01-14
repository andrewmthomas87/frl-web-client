import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uuid from 'node-uuid'

import './Toast.less'

class Toast extends Component {

	static timeout = 2500

	constructor(props) {
		super(props)

		this.toasts = []
		this.timeout = null
		this.state = {
			toast: null
		}
	}

	_addToast() {
		this.setState({
			toast: this.toasts.shift()
		})

		clearTimeout(this.timeout)
		setTimeout(this._removeToast, Toast.timeout)
	}

	_removeToast = () => {
		if (this.toasts.length) {
			this._addToast()
		}
		else {
			this.setState({
				toast: null
			})
		}
	}

	render() {
		return (
			<section id='toast'>
				<ReactCSSTransitionGroup transitionName='drop' transitionEnterTimeout={125} transitionLeaveTimeout={125}>
					{this.state.toast}
				</ReactCSSTransitionGroup>
			</section>
		)
	}

	addToast(toast) {
		this.toasts.push(React.cloneElement(toast, {
			key: uuid.v4(),
			onClick: this.dismiss
		}))

		if (!this.state.toast) {
			this._addToast()
		}
	}

	addToasts(toasts) {
		this.toasts = this.toasts.concat(toasts.map(toast => React.cloneElement(toast, {
			key: uuid.v4(),
			onClick: this.dismiss
		})))

		if (!this.state.toast) {
			this._addToast()
		}
	}

	dismiss = (event) => {
		if (event.target.nodeName !== 'A') {
			this._addToast()
		}
	}

}

export default Toast
