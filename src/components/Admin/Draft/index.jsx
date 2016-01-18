import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import history from 'services/history'
import socket from 'services/socket'

const randomThings = [
	'Deflating game pieces',
	'Knocking stacks over (254)',
	'Buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo',
	'Wrong autonomous',
	'Build failed: ArrayIndexOutOfBoundsException'
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

	_load(users) {
		randomThings.forEach((thing, index) => {
			setTimeout(() => {
				this.setState({
					loading: thing
				})
			}, (index + 1) * 2000)
		})

		setTimeout(() => {
			this.props.addToast(<div>I'm tired of watching this loading thing</div>)

			setTimeout(() => {
				this.props.addToast(<div>I'm Tim</div>)
			}, 4500)
		}, 4500)

		setTimeout(() => {
			this.setState({
				users: users,
				loading: false
			})
		}, (randomThings.length + 2.5) * 2000)
	}

	render() {
		const userRows = this.state.users ? this.state.users.map((user) => {
			return (
				<tr key={user.id}>
					<td>{user.position + 1}</td>
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
		const start = !this.state.loading ? <button className='fixed' onClick={this.start}>Start</button> : null

		const loading = this.state.loading ? (
			<div>
				<h2>Randomizing...</h2>
				<h3>{this.state.loading}</h3>
			</div>
		) : null

		return (
			<div id='draft' className='page'>
				<h1>Draft order</h1>
				{orderTable}
				{start}
				{loading}
			</div>
		)
	}

	componentWillMount() {
		socket.send('Admin.generateDraft').then((generated) => {
			if (!generated) {
				history.replaceState({}, '/admin/draft/start')
				return
			}

			socket.send('Admin.getDraftOrder').then((users) => {
				this._load(users)
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	start = () => {
		history.pushState({}, '/admin/draft/start')
	}

}

export default Draft
