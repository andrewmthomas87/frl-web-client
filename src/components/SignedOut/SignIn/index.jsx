import React, { Component } from 'react'

import history from 'services/history'
import session from 'services/session'

class SignIn extends Component {

	render() {
		return (
			<div id='sign-in' className='page'>
				<h1>Sign in</h1>
				<form onSubmit={this.signIn}>
					<input type='email' placeholder='Email' ref='email' />
					<input type='password' placeholder='Password' ref='password' />
					<button type='submit'>Sign in</button>
				</form>
			</div>
		)
	}

	signIn = (event) => {
		event.preventDefault()

		const { email, password } = this.refs

		session.signIn(email.value, password.value).then(() => {
			if (this.props.location.state && this.props.location.state.nextPathname) {
				history.pushState({}, this.props.location.state.nextPathname)
			}
			else {
				history.pushState({}, '/user')
			}
		}).catch((error) => {
			this.props.addToast(<div>{error}</div>)
		})
	}

}

export default SignIn
