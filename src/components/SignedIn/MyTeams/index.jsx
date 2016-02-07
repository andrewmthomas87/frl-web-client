import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import socket from 'services/socket'

import './MyTeams.less'

class MyTeams extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			teams: null,
			selections: null,
			active: null,
			selected: null
		}
	}

	render() {
		const { teams, selections, active } = this.state

		const activeElements = active && active.length ? active.map((team) => {
			return (
				<div key={team.teamNumber}>
					<span>{team.teamNumber}</span> - <Link to={`/user/team/${team.teamNumber}`}>{team.name}</Link>
				</div>
			)
		}) : null

		const selectionElements = selections && selections.length ? selections.map((team) => {
			const menu = this.state.selected === team.teamNumber ? (
				<div className='menu'>
					<button className='small' onClick={this.deselectTeam}>Deselect</button>
					<button className='small'>Drop</button>
				</div>
			) : null

			return (
				<div key={team.teamNumber} className={menu ? 'selected' : null} data-team-number={team.teamNumber} onClick={this.setTeamSelected}>
					<span>{team.teamNumber}</span> - <Link to={`/user/team/${team.teamNumber}`}>{team.name}</Link>
					{menu}
				</div>
			)
		}) : null

		const teamElements = teams && teams.length ? teams.map((team) => {
			const menu = this.state.selected === team.teamNumber ? (
				<div className='menu'>
					<button className={'small' + (this.state.selections.length === 3 ? ' disabled' : '')} onClick={this.selectTeam}>Select</button>
					<button className='small'>Drop</button>
				</div>
			) : null

			return (
				<div key={team.teamNumber} className={menu ? 'selected' : null} data-team-number={team.teamNumber} onClick={this.setTeamSelected}>
					<span>{team.teamNumber}</span> - <Link to={`/user/team/${team.teamNumber}`}>{team.name}</Link>
					{menu}
				</div>
			)
		}) : null

		const activeHeader = activeElements ? <h4>Active</h4> : null
		const activeContainer = activeElements ? (
			<div className='active'>
				{activeElements}
			</div>
		) : null

		const selectionsHeader = selectionElements ? <h4>Selected</h4> : null
		const selectionsContainer = selectionElements ? (
			<div className='selections'>
				{selectionElements}
			</div>
		) : null

		const teamsHeader = teamElements ? <h4>Benched</h4> : null
		const teamsContainer = teamElements ? (
			<div className='teams'>
				{teamElements}
			</div>
		) : null

		return (
			<div id='my-teams' className='page small'>
				<h1>My teams</h1>
				{activeHeader}
				{activeContainer}
				{selectionsHeader}
				{selectionsContainer}
				{teamsHeader}
				{teamsContainer}
			</div>
		)
	}

	componentWillMount() {
		socket.send('User.getMyTeams').then((teams) => {
			this.setState({
				teams: teams.filter(team => !team.active),
				selections: teams.filter(team => team.active === 1).sort((a, b) => {
					return Number(a.teamNumber > b.teamNumber) * 2 - 1
				}),
				active: teams.filter(team => team.active === 2).sort((a, b) => {
					return Number(a.teamNumber > b.teamNumber) * 2 - 1
				})
			})
		})
	}

	setTeamSelected = (event) => {
		const teamNumber = parseInt(event.target.getAttribute('data-team-number'))

		if (teamNumber) {
			if (teamNumber === this.state.selected) {
				this.setState({
					selected: null
				})
			}
			else {
				this.setState({
					selected: teamNumber
				})
			}
		}
	}

	selectTeam = (event) => {
		const teamNumber = parseInt(event.target.parentElement.parentElement.getAttribute('data-team-number'))

		if (teamNumber) {
			if (this.state.selections.length === 3) {
				this.props.addToast(<div>Maximum of 3 selected teams allowed</div>)
				return
			}

			socket.send('User.selectTeam', teamNumber).then((message) => {
				this.props.addToast(<div>{message}</div>)

				const teams = this.state.teams
				const selections = this.state.selections

				for (let i = 0; i < teams.length; ++i) {
					if (teams[i].teamNumber === teamNumber) {
						const team = teams.splice(i, 1)[0]
						team.active = 1
						selections.push(team)
						break
					}
				}

				selections.sort((a, b) => {
					return Number(a.teamNumber > b.teamNumber) * 2 - 1
				})

				this.setState({
					teams: teams,
					selections: selections,
					selected: null
				})
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}
	}

	deselectTeam = (event) => {
		const teamNumber = parseInt(event.target.parentElement.parentElement.getAttribute('data-team-number'))

		if (teamNumber) {
			socket.send('User.deselectTeam', teamNumber).then((message) => {
				this.props.addToast(<div>{message}</div>)

				const teams = this.state.teams
				const selections = this.state.selections

				for (let i = 0; i < teams.length; ++i) {
					if (selections[i].teamNumber === teamNumber) {
						const team = selections.splice(i, 1)[0]
						team.active = null
						teams.push(team)
						break
					}
				}

				teams.sort((a, b) => {
					return Number(a.teamNumber > b.teamNumber) * 2 - 1
				})

				this.setState({
					teams: teams,
					selections: selections,
					selected: null
				})
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}
	}

}

export default MyTeams
