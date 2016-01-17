import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import socket from 'services/socket'

const eventTypes = [
	'Regional',
	'District',
	'District Championships'
]

class Event extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.code = this.props.params.code
		this.state = {
			event: null
		}
	}

	render() {
		const event = this.state.event

		const tba = event ? (
			<tr key='tba'>
				<th>TBA</th>
				<td><a href ={`http://thebluealliance.com/event/2016${this.code}`} target='_blank'>{`http://thebluealliance.com/event/2016${this.code}`}</a></td>
			</tr>
		) : null
		const location = event ? (
			<tr key='location'>
				<th>Location</th>
				<td>{event.location}</td>
			</tr>
		) : null
		const type = event ? (
			<tr key='type'>
				<th>Type</th>
				<td>{eventTypes[event.type]}</td>
			</tr>
		) : null
		const week = event ? (
			<tr key='week'>
				<th>Week</th>
				<td>{event.week}</td>
			</tr>
		) : null

		const teamRows = event ? event.teams.map((team) => {
			return (
				<tr key={team.teamNumber}>
					<td>{team.teamNumber}</td>
					<td><Link to={`/user/team/${team.teamNumber}`}>{team.name}</Link></td>
				</tr>
			)
		}) : null

		const eventElement = event ? (
			<div>
				<h4><span>{event.name}</span></h4>
				<div className='details'>
					<table>
						<tbody>
							{tba}
							{location}
							{type}
							{week}
						</tbody>
					</table>
				</div>
				<h3>{teamRows.length} teams</h3>
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
			</div>
		) : null

		return (
			<div id='event' className='page'>
				<h1>Event</h1>
				{eventElement}
			</div>
		)
	}

	componentWillMount() {
		socket.send('Event.get', this.code).then((event) => {
			this.setState({
				event: event
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

}

export default Event
