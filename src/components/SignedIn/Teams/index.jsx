import React, { Component, PropTypes } from 'react'

import TeamsOptions from './TeamsOptions'
import TeamsTable from './TeamsTable'

class Teams extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	render() {
		return (
			<div id='teams' className='page wide'>
				<h1>Teams</h1>
				<h4><span>Options</span></h4>
				<TeamsOptions numberChanged={this.numberChanged} weeksChanged={this.weeksChanged} nameChanged={this.nameChanged} sortChanged={this.sortChanged} filterChanged={this.filterChanged} limitChanged={this.limitChanged} />
				<TeamsTable addToast={this.props.addToast} ref='table' />
			</div>
		)
	}

	numberChanged = (number) => {
		this.refs.table.updateSort({
			number: number
		})
	}

	weeksChanged = (weeks) => {
		this.refs.table.updateSort({
			weeks: weeks
		})
	}

	nameChanged = (name) => {
		this.refs.table.updateSort({
			name: name
		})
	}

	sortChanged = (sort) => {
		this.refs.table.updateSort({
			sort: sort
		})
	}

	filterChanged = (filter) => {
		this.refs.table.updateSort({
			filter: filter
		})
	}

	limitChanged = (limit) => {
		this.refs.table.updateLimit(limit)
	}

}

export default Teams
