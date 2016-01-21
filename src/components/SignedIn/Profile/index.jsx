import React, { Component, PropTypes } from 'react'

import history from 'services/history'
import socket from 'services/socket'

import UserDisplay from 'components/global/UserDisplay'

class Profile extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			user: null
		}
	}

	render() {
		const user = this.state.user

		const userElement = user ? (
			<UserDisplay user={user} />			
		) : null

		return (
			<div id='user' className='page'>
				<h1>Profile</h1>
				{userElement}
				<button className='fixed' onClick={this.edit}>Edit profile</button>
			</div>
		)
	}

	componentWillMount() {
		socket.send('User.get').then((user) => {
			this.setState({
				user: user
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})

		socket.subscribe('UserUpdate.firstName', this.firstNameUpdate)
		socket.subscribe('UserUpdate.lastName', this.lastNameUpdate)
		socket.subscribe('UserUpdate.email', this.emailUpdate)
		socket.subscribe('UserUpdate.slack', this.slackUpdate)
	}

	componentWillUnmount() {
		socket.unsubscribe('UserUpdate.firstName', this.firstNameUpdate)
		socket.unsubscribe('UserUpdate.lastName', this.lastNameUpdate)
		socket.unsubscribe('UserUpdate.email', this.emailUpdate)
		socket.unsubscribe('UserUpdate.slack', this.slackUpdate)
	}

	edit = () => {
		history.pushState({
			user: this.state.user
		}, '/user/profile/edit')
	}

	firstNameUpdate = (firstName) => {
		if (this.state.user) {
			this.setState({
				user: Object.assign(this.state.user, { firstName: firstName })
			})
		}
	}

	lastNameUpdate = (lastName) => {
		if (this.state.user) {
			this.setState({
				user: Object.assign(this.state.user, { lastName: lastName })
			})
		}
	}

	emailUpdate = (email) => {
		if (this.state.user) {
			this.setState({
				user: Object.assign(this.state.user, { email: email })
			})
		}
	}

	slackUpdate = (slack) => {
		if (this.state.user) {
			this.setState({
				user: Object.assign(this.state.user, { slack: slack })
			})
		}
	}

}

export default Profile
