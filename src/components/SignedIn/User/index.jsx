import React, { Component, PropTypes } from 'react'

import socket from 'services/socket'

import UserDisplay from 'components/global/UserDisplay'

class User extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.id = this.props.params.id
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
				<h1>User</h1>
				{userElement}
			</div>
		)
	}

	componentWillMount() {
		socket.send('User.get', this.id).then((user) => {
			this.setState({
				user: user
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

}

export default User
