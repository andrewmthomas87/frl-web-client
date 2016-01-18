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
	}

	edit = () => {
		history.pushState({
			user: this.state.user
		}, '/user/profile/edit')
	}

}

export default Profile
