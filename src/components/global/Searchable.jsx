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
				<div>
					{this.state.results.map(result => <div key={result.code} data-code={result.code} onClick={this.onSelect}>{result.name}</div>)}
				</div>
			</div>
		)
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
				const aindex = a.name.toLowerCase().indexOf(search)
				const bindex = b.name.toLowerCase().indexOf(search)
				const alpha = Number(a.name > b.name) * 2 - 1
				return aindex > bindex ? 1 : (aindex < bindex ? -1 : alpha)
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
