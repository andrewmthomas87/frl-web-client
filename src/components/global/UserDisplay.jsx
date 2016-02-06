import React, { Component, PropTypes } from 'react'

import './UserDisplay.less'

const positions = [
	null,
	'Student',
	'Mentor'
]

class UserDisplay extends Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render() {
		const user = this.props.user

		const email = user ? (
			<tr key='email'>
				<th>Email</th>
				<td>{user.email}</td>
			</tr>
		) : null

		const position = user ? (
			<tr key='position'>
				<th>Position</th>
				<td>{positions[user.position]}</td>
			</tr>
		) : null

		const slack = user && user.slack ? (
			<tr key='slack'>
				<th>Slack</th>
				<td>{user.slack}</td>
			</tr>
		) : null

		return user ? (
			<div>
				<div id='picture' style={{backgroundImage: `url('${user.picture}')`}}></div>
				<h4><span>{`${user.firstName} ${user.lastName}`}</span></h4>
				<div className='details'>
					<table>
						<tbody>
							{email}
							{position}
							{slack}
						</tbody>
					</table>
				</div>
			</div>
		) : null
	}

}

export default UserDisplay
