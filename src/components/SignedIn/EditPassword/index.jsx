import React, { Component, PropTypes } from 'react'

import history from 'services/history'
import socket from 'services/socket'

class EditPassword extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	render() {
		return (
			<div id='password' className='page'>
				<h1>Update password</h1>
				<form onSubmit={this.updatePassword}>
					<input type='password' placeholder='Current password' ref='currentPassword' />
					<input type='password' placeholder='New password' ref='newPassword' />
					<input type='password' placeholder='Confirm password' ref='confirmPassword' />
					<button type='submit'>Update</button>
				</form>
			</div>
		)
	}

	updatePassword = (event) => {
		event.preventDefault()

		const { currentPassword, newPassword, confirmPassword } = this.refs
		socket.send('User.updatePassword', {
			currentPassword: currentPassword.value,
			newPassword: newPassword.value,
			confirmPassword: confirmPassword.value
		}).then((message) => {
			this.props.addToast(<div>{message}</div>)
			history.pushState({}, '/user/profile')
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

}

export default EditPassword
