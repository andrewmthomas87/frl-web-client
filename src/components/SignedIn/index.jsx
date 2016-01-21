import React, { Component } from 'react'

import config from '../../config'

import history from 'services/history'
import session from 'services/session'
import socket from 'services/socket'

import Navigation from 'components/global/Navigation'
import Loading from 'components/global/Loading'
import Toast from 'components/global/Toast'

import './SignedIn.less'

class SignedIn extends Component {

	static links = [
		{
			name: 'Dashboard',
			link: '/user'
		},
		{
			name: 'Research',
			link: '/user/research'
		},
		{
			name: 'Profile',
			link: '/user/profile'
		},
		{
			name: 'Sign out',
			link: '/user/sign-out'
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

			this.setState({
				connected: true
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
			<div id='signed-in'>
				<Navigation links={SignedIn.links} />
				<Toast ref='toast' />
				{React.cloneElement(children, {
					addToast: this.addToast,
					addToasts: this.addToasts
				})}
			</div>
		)
	}

	componentWillMount() {
		socket.subscribe('UserUpdate.signOut', this.signOutUpdate)
	}

	componentWillUnmount() {
		socket.unsubscribe('UserUpdate.signOut', this.signOutUpdate)
	}

	addToast = (toast) => {
		this.refs.toast.addToast(toast)
	}

	addToasts = (toasts) => {
		this.refs.toast.addToasts(toasts)
	}

	signOutUpdate = () => {
		if (!session.getToken()) {
			history.pushState({}, '/user/sign-out')
		}
	}

}

export default SignedIn
