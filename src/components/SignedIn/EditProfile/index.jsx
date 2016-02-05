import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import history from 'services/history'
import socket from 'services/socket'

class EditProfile extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		const state = props.location.state

		this.state = {
			user: state && state.user ? state.user : null
		}
	}

	render() {
		const user = this.state.user

		const edit = user ? (
			<div>
				<div className='button-group'>
					<Link to='/user/profile/edit/picture'>
						<button>Picture</button>
					</Link>
					<Link to='/user/profile/edit/password'>
						<button>Password</button>
					</Link>
				</div>
				<div className='labeled-input'>
					<h4>First name</h4>
					<input type='text' name='firstName' defaultValue={user.firstName} placeholder='First name' onBlur={this.update} onKeyPress={this.blurInput} ref='firstName' />
				</div>
				<div className='labeled-input'>
					<h4>Last name</h4>
					<input type='text' name='lastName' defaultValue={user.lastName} placeholder='Last name' onBlur={this.update} onKeyPress={this.blurInput} ref='lastName' />
				</div>
				<div className='labeled-input'>
					<h4>Email</h4>
					<input type='email' name='email' defaultValue={user.email} placeholder='Email' onBlur={this.update} onKeyPress={this.blurInput} ref='email' />
				</div>
				<div className='labeled-input'>
					<h4>Slack</h4>
					<input type='text' name='slack' defaultValue={user.slack} placeholder='Slack' onBlur={this.update} onKeyPress={this.blurInput} ref='slack' />
				</div>
				<Link to='/user/profile'>
					<button className='fixed'>Profile</button>
				</Link>
			</div>
		) : null

		return (
			<div id='edit' className='page small button'>
				<h1>Edit profile</h1>
				{edit}
			</div>
		)
	}

	componentWillMount() {
		if (!this.state.user) {
			history.replaceState({}, '/user/profile')
		}
	}

	blurInput = ({ target, key }) => {
		if (key === 'Enter') {
			target.blur()
		}
	}

	update = ({ target }) => {
		const type = target.getAttribute('name')

		const input = this.refs[type]

		if (this.state.user[type] === input.value || !(this.state.user[type] || input.value)) {
			return
		}

		socket.send(`User.update${type[0].toUpperCase()}${type.slice(1)}`, input.value).then((message) => {
			this.state.user[type] = input.value
			this.props.addToast(<div>{message}</div>)
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
			input.value = this.state.user[type]
			input.focus()
		})		
	}

}

export default EditProfile
