import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import { default as TouchBackend } from 'react-dnd-touch-backend'

import socket from 'services/socket'

import PickListTeam from './PickListTeam'
import PickListTeamPreview from './PickListTeamPreview'
import PickListRemove from './PickListRemove'

import './PickList.less'

@DragDropContext(TouchBackend({
	enableMouseEvents: true
}))
class PickList extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			teams: null,
			dragging: false
		}
	}

	render() {
		const teams = this.state.teams

		const teamElements = teams ? (
			teams.length ? teams.map((team, index) => {
				return <PickListTeam key={team.teamNumber} index={index} teamNumber={team.teamNumber} name={team.name} moveTeam={this.moveTeam} droppedTeam={this.droppedTeam} beganDrag={this.beganDrag} endedDrag={this.endedDrag} />
			}) : <h3>No teams</h3>
		) : null

		const pickListRemove = teams ? <PickListRemove active={this.state.dragging} removeTeam={this.removeTeam} /> : null
		const teamsList = teams ? (
			<div className='list'>
				<PickListTeamPreview name='team' />
				{teamElements}
			</div>
		) : null

		return (
			<div id='pick-list' className='page'>
				<h1>Pick list</h1>
				{pickListRemove}
				{teamsList}
			</div>
		)
	}

	componentWillMount() {
		socket.send('User.getPickListTeams').then((teams) => {
			this.setState({
				teams: teams
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	moveTeam = (dragIndex, hoverIndex) => {
		const teams = this.state.teams
		const dragTeam = teams.splice(dragIndex, 1)[0]

		teams.splice(hoverIndex, 0, dragTeam)

		this.setState({
			teams: teams
		})
	}

	droppedTeam = (index) => {
		socket.send('User.movedPickListTeam', {
			teamNumber: this.state.teams[index].teamNumber,
			index: index
		}).then(() => {

		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	removeTeam = (index) => {
		const teams = this.state.teams
		const teamNumber = teams.splice(index, 1)[0].teamNumber

		this.setState({
			teams: teams
		})

		socket.send('User.deletedPickListTeam', {
			teamNumber: teamNumber,
			index: index
		}).then((message) => {
			this.props.addToast(<div>{message}</div>)
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	beganDrag = () => {
		this.setState({
			dragging: true
		})
	}

	endedDrag = () => {
		this.setState({
			dragging: false
		})
	}

}

export default PickList
