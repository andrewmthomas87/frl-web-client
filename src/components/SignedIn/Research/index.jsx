import React, { Component } from 'react'
import { Link } from 'react-router'

class Research extends Component {

	render() {
		return (
			<div id='research' className='page'>
				<h1>Research</h1>
				<div className='button-group'>
					<Link to='/user/teams'><button>Teams</button></Link>
					<Link to='/user/events'><button>Events</button></Link>
					<Link to='/user/users'><button>Users</button></Link>
				</div>
			</div>
		)
	}

}

export default Research
