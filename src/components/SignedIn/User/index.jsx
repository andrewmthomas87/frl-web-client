import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import socket from 'services/socket'

import UserDisplay from 'components/global/UserDisplay'

class User extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.id = this.props.params.id
		this.state = {
			user: null,
			teams: null
		}
	}

	render() {
		const { user, teams } = this.state
		
		const userElement = user ? <UserDisplay user={user} /> : null

		const teamRows = user && teams ? teams.map((team) => {
			return (
				<tr key={team.teamNumber}>
					<td>{team.teamNumber}</td>
					<td><Link to={`/user/team/${team.teamNumber}`}>{team.name}</Link></td>
				</tr>
			)
		}) : null
		const teamsHeader = teamRows ? <h3>Teams</h3> : null
		const teamsTable = teamRows ? (
			<table>
				<thead>
					<tr>
						<th>Team number</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{teamRows}
				</tbody>
			</table>
		) : null

		return (
			<div id='user' className='page'>
				<h1>User</h1>
				{userElement}
				{teamsHeader}
				{teamsTable}
			</div>
		)
	}

	componentWillMount() {
		socket.send('User.get', this.id).then((user) => {
			this.setState({
				user: user
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})

		socket.send('User.getTeams', this.id).then((teams) => {
			this.setState({
				teams: teams
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

}

export default User
