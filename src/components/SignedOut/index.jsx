import React, { Component } from 'react'

import Navigation from 'components/global/Navigation'
import Toast from 'components/global/Toast'

import './SignedOut.less'

class SignedOut extends Component {

	static links = [
		{
			name: 'Home',
			link: '/'
		},
		{
			name: 'About',
			link: '/about'
		},
		{
			name: 'Sign up',
			link: '/sign-up'
		},
		{
			name: 'Sign in',
			link: '/sign-in'
		}
	]

	render() {
		return (
			<div id='signed-out'>
				<Navigation links={SignedOut.links} />
				<Toast ref='toast' />
				{React.cloneElement(this.props.children, {
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

export default SignedOut
