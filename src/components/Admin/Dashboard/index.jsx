import React, { Component } from 'react'
import { Link } from 'react-router'

class Dashboard extends Component {

	render() {
		return (
			<div id='dashboard' className='page'>
				<h1>Dashboard</h1>
				<div className='button-group'>
					<Link to='/admin/draft'><button>Draft</button></Link>
					<Link to='/admin/users'><button>Manage users</button></Link>
				</div>
			</div>
		)
	}

}

export default Dashboard
