import React, { Component, PropTypes } from 'react'

import history from 'services/history'
import socket from 'services/socket'

import Searchable from 'components/global/Searchable'

class Events extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			events: []
		}
	}

	render() {
		return (
			<div id='events' className='page small'>
				<h1>Events</h1>
				<Searchable searchables={this.state.events} onSelect={this.navigate} ref='searchable' />
			</div>
		)
	}

	componentWillMount() {
		socket.send('Events.getSearchables').then((events) => {
			this.setState({
				events: events
			})
		}).catch((error) => {
			this.props.addToast(<div>{error.error}</div>)
		})
	}

	componentDidMount() {
		this.refs.searchable.focus()
	}

	navigate = (code) => {
		history.pushState({}, `/user/event/${code}`)
	}

}

export default Events
