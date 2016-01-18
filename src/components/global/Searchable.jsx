import React, { Component, PropTypes } from 'react'

import './Searchable.less'

class Searchable extends Component {

	static propTypes = {
		searchables: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			results: []
		}
	}

	render() {
		return (
			<div>
				<input type='text' placeholder='Search' onChange={this.search} ref='search' />
				<div className='results'>
					{this.state.results.map(result => <div key={result.key} data-code={result.key} onClick={this.onSelect}>{result.name}</div>)}
				</div>
			</div>
		)
	}

	focus() {
		this.refs.search.focus()
	}

	search = () => {
		const search = this.refs.search.value

		if (search) {
			let results = this.props.searchables.slice(0)

			const regex = new RegExp(search, 'i')
			results = results.filter((result) => {
				return regex.test(result.name)
			})

			results = results.sort((a, b) => {
				const aIndex = a.name.toLowerCase().indexOf(search)
				const bIndex = b.name.toLowerCase().indexOf(search)
				const alpha = Number(a.name > b.name) * 2 - 1
				return aIndex > bIndex ? 1 : (aIndex < bIndex ? -1 : alpha)
			})

			this.setState({
				results: results.slice(0, 10)
			})
		}
		else {
			this.setState({
				results: []
			})
		}
	}

	onSelect = (event) => {
		this.props.onSelect(event.target.getAttribute('data-code'))
	}

}

export default Searchable
