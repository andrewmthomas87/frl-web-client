import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import socket from 'services/socket'

class Team extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.teamNumber = this.props.params.teamNumber
		this.state = {
			team: null
		}
	}

	render() {
		const team = this.state.team

		const owner = team ? (
			<tr key='owner'>
				<th>Owner</th>
				<td>{team.owner ? <Link to={`/user/user/${team.owner}`}>{team.userName}</Link> : 'Available'}</td>
			</tr>
		) : null
		const tba = team ? (
			<tr key='tba'>
				<th>TBA</th>
				<td><a href={`http://thebluealliance.com/team/${this.teamNumber}`} target='_blank'>{`http://thebluealliance.com/team/${this.teamNumber}`}</a></td>
			</tr>
		) : null
		const website = team && team.website ? (
			<tr key='website'>
				<th>Website</th>
				<td><a href={team.website} target='_blank'>{team.website}</a></td>
			</tr>
		) : null
		const location = team && team.location ? (
			<tr key='location'>
				<th>Location</th>
				<td>{team.location}</td>
			</tr>
		) : null
		const rookieYear = team && team.rookieYear ? (
			<tr key='rookieYear'>
				<th>Rookie year</th>
				<td>{team.rookieYear}</td>
			</tr>
		) : null

		const averageSeed = team && team.averageSeed ? (
			<tr key='averageSeed'>
				<th>Average seed</th>
				<td>{team.averageSeed}</td>
			</tr>
		) : null
		const averageCCWM = team && team.averageCCWM ? (
			<tr key='averageCCWM'>
				<th>Average CCWM</th>
				<td>{team.averageCCWM}</td>
			</tr>
		) : null
		const eventWins = team && team.eventWins ? (
			<tr key='eventWins'>
				<th>Event wins</th>
				<td>{team.eventWins}</td>
			</tr>
		) : null

		const events = team && team.events ? (
			<tr>
				<th>Events</th>
				<td>{team.events.map(event => <span key={event.code}><Link to={`/user/event/${event.code}`}>{event.name}</Link><br /></span>)}</td>
			</tr>
		) : null
		const weeks = team && team.weeks ? (
			<tr>
				<th>Weeks</th>
				<td>{team.weeks.join(', ').substr(0, team.weeks.length * 3 - 2)}</td>
			</tr>
		) : null

		const teamElement = team ? (
			<div>
				<h1>{this.teamNumber}</h1>
				<h4><span>{team.name}</span></h4>
				<div className='details'>
					<table>
						<tbody>
							{owner}
							{tba}
							{website}
							{location}
							{rookieYear}
							<tr>
								<th className='header'>2014-2015</th>
							</tr>
							{averageSeed}
							{averageCCWM}
							{eventWins}
							<tr>
								<th className='header'>2016</th>
							</tr>
							{events}
							{weeks}
						</tbody>
					</table>
				</div>
			</div>
		) : <h1>{this.teamNumber}</h1>

		return (
			<div id='team' className='page'>
				{teamElement}
			</div>
		)
	}

	componentWillMount() {
		socket.send('Team.get', this.teamNumber).then((team) => {
			this.setState({
				team: team
			})

			socket.subscribe('TeamUpdate.owner', this.ownerUpdate)
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	componentWillUnmount() {
		socket.unsubscribe('TeamUpdate.owner', this.ownerUpdate)
	}

	ownerUpdate = () => {
		socket.send('Team.get', this.teamNumber).then((team) => {
			this.setState({
				team: team
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

}

export default Team
