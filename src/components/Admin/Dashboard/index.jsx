import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import socket from 'services/socket'

class Dashboard extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	render() {
		return (
			<div id='dashboard' className='page'>
				<h1>Dashboard</h1>
				<div className='button-group'>
					<Link to='/admin/draft'><button>Draft</button></Link>
					<button onClick={this.resetDraft}>Reset draft</button>
					<Link to='/admin/users'><button>Manage users</button></Link>
				</div>
			</div>
		)
	}

	resetDraft = () => {
		socket.send('Admin.resetDraft').then((message) => {
			this.props.addToast(<div>{message}</div>)
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

}

export default Dashboard
