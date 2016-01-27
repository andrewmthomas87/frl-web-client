import React, { Component, PropTypes } from 'react'

import socket from 'services/socket'

import Counter from 'components/global/Counter'

import './Start.less'

class Start extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.teams = {}
		this.state = {
			round: null,
			nextUp: null,
			team: null
		}
	}

	render() {
		const nextUp = this.state.nextUp

		const nextUpElement = nextUp ? (
			<div>
				{nextUp.map(user => (
					<div key={user.position}>
						<div>{user.position + 1}</div>
						<div>{user.name}</div>
					</div>
				))}
			</div>
		) : null

		const team = this.state.team

		const teamElement = team ? (
			<div className='team'>
				<div className='name'>{team.name}</div>
				<div className='stats'>
					<div>
						<div>CCWM</div>
						<div>Seed</div>
						<div>Weeks</div>
					</div>
					<div>
						<div>{Math.round(team.averageCCWM, 1) || '-'}</div>
						<div>{Math.round(team.averageSeed, 1) || '-'}</div>
						<div>{team.weeks.join(', ')}</div>
					</div>
				</div>
				<button className='small' data-team-number={team.teamNumber} onClick={this.select}>Select</button>
			</div>
		) : null

		const draft = this.state.round ? (
			<div>
				<div className='order'>
					<h4><span>Draft order</span></h4>
					{nextUpElement}
				</div>
				<div className='selection'>
					<h4><input type='text' onChange={this.search} ref='search' /></h4>
					{teamElement}
					<Counter ref='counter' />
				</div>
				<h4><span>Round {this.state.round}</span></h4>
			</div>
		) : null

		return (
			<div id='start' className='page'>
				<h1>Draft</h1>
				{draft}
			</div>
		)
	}

	componentWillMount() {
		socket.send('Admin.startDraft').then((round) => {
			socket.send('Admin.getDraftNextUp').then((draft) => {
				socket.send('Teams.get').then((teams) => {
					teams = teams.filter((team) => {
						return !team.owner
					})
					teams.forEach((team) => {
						this.teams[team.teamNumber] = team
					})

					this.setState({
						round: round,
						nextUp: draft.nextUp
					})

					this.refs.counter.start(60)
				})
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	search = () => {
		const search = this.refs.search.value

		if (search && /^\d+$/.test(search)) {
			this.setState({
				team: this.teams[search] || null
			})
		}
		else {
			this.setState({
				team: null
			})
		}
	}

	select = (event) => {
		const teamNumber = parseInt(event.target.getAttribute('data-team-number'))

		if (teamNumber) {
			socket.send('Admin.draftSelectTeam', teamNumber).then((message) => {
				this.teams[teamNumber] = null

				socket.send('Admin.getDraftNextUp').then((draft) => {
					this.props.addToast(<div>{message}</div>)

					this.refs.search.value = ''
					this.refs.counter.start(60)

					this.setState({
						round: draft.round,
						team: null,
						nextUp: draft.nextUp
					})
				}).catch((error) => {
					this.props.addToast(<div>{error.error}</div>)
				})
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}
	}

}

export default Start
