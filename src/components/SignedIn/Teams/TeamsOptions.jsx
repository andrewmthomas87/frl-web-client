import React, { Component, PropTypes } from 'react'

import Select from 'components/global/Select'
import SelectMultiple from 'components/global/SelectMultiple'

import './TeamsOptions.less'

class TeamsOptions extends Component {

	static propTypes = {
		numberChanged: PropTypes.func.isRequired,
		weeksChanged: PropTypes.func.isRequired,
		nameChanged: PropTypes.func.isRequired,
		sortChanged: PropTypes.func.isRequired,
		limitChanged: PropTypes.func.isRequired
	}

	static weeks = [0, 1, 2, 3, 4, 5, 6, 7].map(week => ({
		key: week,
		name: `${week}`
	}))

	static sorts = [
		{
			key: 'teamNumber',
			name: 'Team number'
		},
		{
			key: 'averageSeed',
			name: 'Average seed'
		},
		{
			key: 'averageCCWM',
			name: 'Average CCWM'
		},
		{
			key: 'eventWins',
			name: 'Event wins'
		}
	]

	static limits = [
		{
			key: 0,
			name: 'None'
		},
		{
			key: 100,
			name: '100'
		},
		{
			key: 500,
			name: '500'
		}
	]

	render() {
		return (
			<div id='teams-options'>
				<div>
					<h5>Number</h5>
					<input type='text' placeholder='Number' onChange={this.numberChanged} />
				</div>
				<div>
					<h5>Weeks</h5>
					<SelectMultiple options={TeamsOptions.weeks} size='small' onChange={this.props.weeksChanged} />
				</div>
				<div>
					<h5>Name</h5>
					<input type='text' placeholder='Name' onChange={this.nameChanged} />
				</div>
				<br />
				<div>
					<h5>Sort by</h5>
					<Select options={TeamsOptions.sorts} size='large' onChange={this.props.sortChanged} selected={1} />
				</div>
				<br />
				<div>
					<h5>Limit</h5>
					<Select options={TeamsOptions.limits} size='medium' onChange={this.props.limitChanged} selected={2} />
				</div>
			</div>
		)
	}

	numberChanged = (event) => {
		this.props.numberChanged(event.target.value)
	}

	nameChanged = (event) => {
		this.props.nameChanged(event.target.value)
	}

}

export default TeamsOptions
