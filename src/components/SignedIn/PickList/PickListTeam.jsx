import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { DragSource, DropTarget } from 'react-dnd'

const teamSource = {
	beginDrag(props) {
		const { teamNumber, name, index, beganDrag } = props

		beganDrag()

		return {
			teamNumber: teamNumber,
			name: name,
			index: index
		}
	},
	endDrag(props) {
		props.endedDrag()
	}
}

const teamTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		if (dragIndex === hoverIndex) {
			return
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		monitor.getItem().index = hoverIndex

		props.moveTeam(dragIndex, hoverIndex)
	},
	drop(props, monitor) {
		props.droppedTeam(monitor.getItem().index)
	}
}

@DropTarget('team', teamTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget()
}))
@DragSource('team', teamSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
class PickListTeam extends Component {

	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		beganDrag: PropTypes.func.isRequired,
		endedDrag: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		teamNumber: PropTypes.any.isRequired,
		name: PropTypes.string.isRequired,
		moveTeam: PropTypes.func.isRequired,
		droppedTeam: PropTypes.func.isRequired
	}

	render() {
		const { teamNumber, name, isDragging, connectDragSource, connectDropTarget } = this.props

		return connectDropTarget(
			<div className='team' style={{opacity: isDragging ? 0 : 1}}>
				<h5>{teamNumber} - <Link to={`/user/team/${teamNumber}`}>{name}</Link></h5>
				{connectDragSource(<span className='drag'></span>)}
			</div>
		)
	}

}

export default PickListTeam
