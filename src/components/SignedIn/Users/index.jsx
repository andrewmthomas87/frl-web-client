import React, { Component, PropTypes } from 'react'

import history from 'services/history'
import socket from 'services/socket'

import Searchable from 'components/global/Searchable'

class Users extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			users: []
		}
	}

	render() {
		return (
			<div id='users' className='page small'>
				<h1>Users</h1>
				<Searchable searchables={this.state.users} onSelect={this.navigate} ref='searchable' />
			</div>
		)
	}

	componentWillMount() {
		socket.send('Users.getSearchables').then((users) => {
			this.setState({
				users: users
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	componentDidMount() {
		this.refs.searchable.focus()
	}

	navigate = (id) => {
		history.pushState({}, `/user/user/${id}`)
	}

}

export default Users
