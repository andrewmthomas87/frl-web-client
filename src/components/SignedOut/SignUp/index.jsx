import React, { Component, PropTypes } from 'react'

import history from 'services/history'
import session from 'services/session'

class SignUp extends Component {

	static propTypes = {
		addToasts: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			position: 0
		}
	}

	render() {
		return (
			<div id='sign-up' className='page'>
				<h1>Sign up</h1>
				<form onSubmit={this.signUp}>
					<input type='text' placeholder='First name' ref='firstName' />
					<input type='text' placeholder='Last name' ref='lastName' />
					<input type='email' placeholder='Email' ref='email' />
					<div className='select'>
						<div className={'option' + (this.state.position == 1 ? ' selected' : '')} onClick={this.selectStudent}>Student</div>
						<div className={'option' + (this.state.position == 2 ? ' selected' : '')} onClick={this.selectMentor}>Mentor</div>
					</div>
					<input type='password' placeholder='Password' ref='password' />
					<button type='submit'>Sign up</button>
				</form>
			</div>
		)
	}

	selectStudent = () => {
		this.setState({
			position: 1
		})
	}

	selectMentor = () => {
		this.setState({
			position: 2
		})
	}

	signUp = (event) => {
		event.preventDefault()

		const { firstName, lastName, email, password } = this.refs
		const position = this.state.position

		session.signUp(firstName.value, lastName.value, email.value, position, password.value).then(() => {
			history.pushState({}, '/user')
		}).catch((errors) => {
			this.props.addToasts(errors.map(error => <div>{error}</div>))
		})
	}

}

export default SignUp
