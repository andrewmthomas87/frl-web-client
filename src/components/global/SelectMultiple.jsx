import React, { Component, PropTypes } from 'react'

import './Select.less'

class SelectMultiple extends Component {

	static propTypes = {
		options: PropTypes.array.isRequired,
		size: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		selected: PropTypes.array
	}

	constructor(props) {
		super(props)

		this.state = {
			selected: props.selected || []
		}
	}

	render() {
		const options = this.props.options.map((option, index) => {
			return <div key={index} data-index={index} className={`option ${this.props.size}` + (this.state.selected.indexOf(index) > -1 ? ' selected' : '')} onClick={this.toggle}>{option.name}</div>
		})

		return (
			<div className='select'>
				{options}
			</div>
		)
	}

	toggle = (event) => {
		const selected = this.state.selected
		const toggle = parseInt(event.target.getAttribute('data-index'))

		if (toggle || toggle === 0) {
			const index = selected.indexOf(toggle)

			if (index > -1) {
				selected.splice(index, 1)
			}
			else {
				selected.push(toggle)
			}

			this.setState({
				selected: selected
			})

			this.props.onChange(selected.map(selection => this.props.options[selection].key))
		}
	}

}

export default SelectMultiple
