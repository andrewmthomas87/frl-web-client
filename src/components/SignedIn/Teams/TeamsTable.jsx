import React, { Component, PropTypes } from 'react'

import socket from 'services/socket'

import Teams from './Teams'

import './TeamsTable.less'

class TeamsTable extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.sort = {
			number: null,
			weeks: [],
			name: null,
			sort: 'teamNumber',
			filter: 0
		}
		this.state = {
			teams: null,
			limit: 100
		}
	}

	render() {
		const teams = this.state.teams

		const teamsLength = teams ? <h3>{`${teams.length} team${teams.length === 1 ? '' : 's'}`}</h3> : null

		const teamRows = []

		if (teams) {
			for (let i = 0, length = Math.min(teams.length, this.state.limit || teams.length); i < length; ++i) {
				teamRows.push((
					<tr key={teams[i].teamNumber} className={teams[i].owner ? 'taken' : ''}>
						<td>{teams[i].teamNumber}</td>
						<td><a href={`/user/team/${teams[i].teamNumber}`} target='_blank'>{teams[i].name}</a></td>
						<td>{teams[i].averageSeed}</td>
						<td>{teams[i].averageCCWM}</td>
						<td>{teams[i].eventWins}</td>
						<td>{teams[i].weeks.join(', ')}</td>
					</tr>
				))
			}
		}

		const table = teams && teams.length ? (
			<table>
				<thead>
					<tr>
						<th>Team number</th>
						<th>Name</th>
						<th>Average seed</th>
						<th>Average <acronym title='Calculated Contribution to Winning Margin'>CCWM</acronym></th>
						<th>Event wins</th>
						<th>Weeks</th>
					</tr>
				</thead>
				<tbody>
					{teamRows}
				</tbody>
			</table>
		) : null

		return (
			<div id='teams-table'>
				{teamsLength}
				{table}
			</div>
		)
	}

	componentWillMount() {
		Teams.get().then(() => {
			this.setState({
				teams: Teams.teams
			})

			socket.subscribe('TeamUpdate.owner', this.ownerUpdate)
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	componentWillUnmount() {
		socket.unsubscribe('TeamUpdate.owner', this.ownerUpdate)
	}

	updateSort(update) {
		if (this.state.teams) {
			this.setState({
				teams: Teams.getTeams(Object.assign(this.sort, update))
			})
		}
	}

	updateLimit(limit) {
		this.setState({
			limit: limit
		})
	}

	ownerUpdate = ({ teamNumber, owner }) => {
		Teams.updateTeamOwner(teamNumber, owner)
		this.setState({
			teams: Teams.getTeams(this.sort)
		})
	}

}

export default TeamsTable
