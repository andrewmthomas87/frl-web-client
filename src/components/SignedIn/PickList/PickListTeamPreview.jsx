import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import DragLayer from 'react-dnd/lib/DragLayer'

function collect(monitor) {
	const team = monitor.getItem()

	return {
		teamNumber: team && team.teamNumber,
		name: team && team.name,
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}
}

function getItemStyles(currentOffset) {
	if (!currentOffset) {
		return {
			display: 'none'
		}
	}

	const transform = `translateY(${currentOffset.y}px)`

	return {
		transform: transform,
		WebkitTransform: transform
	}
}

@DragLayer(collect)
class PickListTeamPreview extends Component {

	static propTypes = {
		teamNumber: PropTypes.number,
		name: PropTypes.string,
		currentOffset: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired
		}),
		isDragging: PropTypes.bool.isRequired
	}

	render() {
		const { teamNumber, name, isDragging, currentOffset } = this.props

		if (!isDragging) {
			return <div></div>
		}

		return (
			<div className='layer'>
				<div className='team preview' style={getItemStyles(currentOffset)}>
					<h5>{teamNumber} - <Link to={`/user/team/${teamNumber}`}>{name}</Link></h5>
					<span className='drag'></span>
				</div>
			</div>
		)
	}

}

export default PickListTeamPreview
