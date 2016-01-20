import React, { Component } from 'react'

import socket from 'services/socket'

class ManageUsers extends Component {

	constructor(props) {
		super(props)

		this.state = {
			users: null
		}
	}

	render() {
		const users = this.state.users

		const userRows = users ? users.map((user) => {
			return (
				<tr key={user.id}>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td><button className='tiny' data-id={user.id} onClick={this.remove}>Remove</button></td>
				</tr>
			)
		}) : null

		const userTable = users ? (
			<table>
				<thead>
					<th>ID</th>
					<th>Name</th>
					<th></th>
				</thead>
				<tbody>
					{userRows}
				</tbody>
			</table>
		) : null

		return (
			<div id='manage-users' className='page'>
				<h1>Manage users</h1>
				{userTable}
			</div>
		)
	}

	componentWillMount() {
		socket.send('Users.get').then((users) => {
			this.setState({
				users: users
			})
		})
	}

	remove = (event) => {
		const id = parseInt(event.target.getAttribute('data-id'))

		if (id) {
			socket.send('Admin.removeUser', id).then((message) => {
				this.props.addToast(<div>{message}</div>)

				this.setState({
					users: this.state.users.filter(user => user.id !== id)
				})
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}
	}

}

export default ManageUsers
