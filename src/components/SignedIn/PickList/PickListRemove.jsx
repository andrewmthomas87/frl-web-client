import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

const removeTarget = {
	drop(props, monitor) {
		props.removeTeam(monitor.getItem().index)
	}
}

@DropTarget('team', removeTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	hovered: monitor.isOver()
}))
class PickListRemove extends Component {

	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		hovered: PropTypes.bool.isRequired,
		active: PropTypes.bool.isRequired,
		removeTeam: PropTypes.func.isRequired
	}

	render() {
		return this.props.connectDropTarget(<button className={'fixed' + (this.props.active ? (this.props.hovered ? ' hovered' : '') : ' hidden')}>Remove</button>)
	}

}

export default PickListRemove
