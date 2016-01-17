import React, { Component } from 'react'

import config from '../../config'

import history from 'services/history'
import session from 'services/session'
import socket from 'services/socket'

import Navigation from 'components/global/Navigation'
import Loading from 'components/global/Loading'
import Toast from 'components/global/Toast'

import './Admin.less'

class Admin extends Component {

	static links = [
		{
			name: 'Dashboard',
			link: '/admin'
		},
		{
			name: 'Exit',
			link: '/user'
		}
	]

	constructor(props) {
		super(props)

		const connected = socket.connected()

		this.state = {
			connected: connected
		}

		if (!connected) {
			this._waitForSocket()
		}
	}

	_waitForSocket() {
		const connectTimeout = setTimeout(() => {
			delete connectPromise.promise

			socket.disconnect()
			session.signOut()

			history.pushState({ nextPathname: this.props.location.pathname }, '/sign-in')
		}, config.connectTimeout)

		const connectPromise = socket.connect(session.getToken()).then(() => {
			clearTimeout(connectTimeout)

			socket.send('Admin.verify').then(() => {
				this.setState({
					connected: true
				})
			}).catch((error) => {
				history.replaceState({}, '/user')
			})
		}).catch(() => {
			clearTimeout(connectTimeout)

			socket.disconnect()
			session.signOut()

			history.pushState({ nextPathname: this.props.location.pathname }, '/sign-in')
		})
	}

	render() {
		const children = this.state.connected ? this.props.children : <Loading />

		return (
			<div id='admin'>
				<Navigation links={Admin.links} />
				<Toast ref='toast' />
				{React.cloneElement(children, {
					addToast: this.addToast,
					addToasts: this.addToasts
				})}
			</div>
		)
	}

	addToast = (toast) => {
		this.refs.toast.addToast(toast)
	}

	addToasts = (toasts) => {
		this.refs.toast.addToasts(toasts)
	}

}

export default Admin
