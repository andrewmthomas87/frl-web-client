import React, { Component } from 'react'

import history from 'services/history'
import session from 'services/session'
import socket from 'services/socket'

class SignOut extends Component {

	render() {
		return null
	}

	componentWillMount() {
		socket.disconnect()
		session.signOut()
		history.pushState({}, '/')
	}

}

export default SignOut
