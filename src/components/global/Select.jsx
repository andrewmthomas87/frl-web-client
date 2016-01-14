import React, { Component, PropTypes } from 'react'

import './Select.less'

class Select extends Component {

	static propTypes = {
		options: PropTypes.array.isRequired,
		size: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		selected: PropTypes.number
	}

	constructor(props) {
		super(props)

		this.state = {
			selected: props.selected || 0
		}
	}

	render() {
		const options = this.props.options.map((option, index) => {
			return <div key={index} data-index={index + 1} className={`option ${this.props.size}` + (this.state.selected === index + 1 ? ' selected' : '')} onClick={this.set}>{option.name}</div>
		})

		return (
			<div className='select'>
				{options}
			</div>
		)
	}

	set = (event) => {
		const set = parseInt(event.target.getAttribute('data-index'))

		if (set) {
			this.setState({
				selected: set
			})

			this.props.onChange(this.props.options[set - 1].key)
		}
	}

}

export default Select
