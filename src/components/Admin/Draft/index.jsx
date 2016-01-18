import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import history from 'services/history'
import socket from 'services/socket'

const randomThings = [
	'Knocking stacks over (254)',
	'Deflating game pieces',
	'Buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo',
	'Brainstorming terrible loading bar messages',
	'Build failed: ArrayIndexOutOfBounds',
	'Wrong autonomous'
]

class Draft extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			users: null,
			loading: true
		}
	}

	render() {
		const userRows = this.state.users ? this.state.users.map((user, index) => {
			return (
				<tr key={user.id}>
					<td>{index + 1}</td>
					<td>{user.name}</td>
				</tr>
			)
		}) : null

		const orderTable = !this.state.loading ? (
			<table>
				<thead>
					<tr>
						<th>Position</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{userRows}
				</tbody>
			</table>
		) : null

		const start = !this.state.loading ? <button className='fixed' onClick={this.start}>Start</button> : (
			<div>
				<h2>Randomizing...</h2>
				<h3>{this.state.loading}</h3>
			</div>
		)

		return (
			<div id='draft' className='page'>
				<h1>Draft order</h1>
				{orderTable}
				{start}
			</div>
		)
	}

	componentWillMount() {
		socket.send('Users.get').then((users) => {
			for (let i = 0; i < 100; ++i) {
				users = users.sort((a, b) => {
					return Math.round(Math.random()) * 2 - 1
				})
			}

			let randomThingsShuffled = randomThings.slice(0)
			randomThingsShuffled = randomThingsShuffled.sort((a, b) => {
				return Math.round(Math.random()) * 2 - 1
			})

			randomThingsShuffled.forEach((thing, index) => {
				setTimeout(() => {
					this.setState({
						loading: thing
					})
				}, (index + 1) * 2000)
			})

			setTimeout(() => {
				this.props.addToast(<div>I'm tired of watching this stupid loading thing</div>)

				setTimeout(() => {
					this.props.addToast(<div>I'm Tim</div>)
				}, 4500)
			}, 4500)

			setTimeout(() => {
				this.setState({
					users: users,
					loading: false
				})
			}, (randomThingsShuffled.length + 1.5) * 2000)
		})
	}

	start = () => {
		history.pushState({
			users: this.state.users
		}, '/admin/draft/start')
	}

}

export default Draft
