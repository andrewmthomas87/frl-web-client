import React, { Component } from 'react'

import history from 'services/history'

import Navigation from 'components/global/Navigation'

import './NotFound.less'

class NotFound extends Component {

	static links = [
		{
			name: 'Home',
			link: '/'
		}
	]

	render() {
		return (
			<div id='not-found'>
				<Navigation links={NotFound.links} />
				<div className='page'>
					<h1>404</h1>
					<h3>Not found</h3>
				</div>
			</div>
		)
	}

}

export default NotFound
