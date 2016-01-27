import React, { Component } from 'react'

class Counter extends Component {

	constructor(props) {
		super(props)

		this.decrementInterval = null
		this.state = {
			count: null
		}
	}

	render() {
		return <div className='counter'>{this.state.count}</div>
	}

	start(count) {
		clearInterval(this.decrementInterval)

		this.setState({
			count: count
		})

		this.decrementInterval = setInterval(this.decrement, 1000)
	}

	decrement = () => {
		this.setState({
			count: --this.state.count
		})

		if (!this.state.count) {
			clearInterval(this.decrementInterval)
		}
	}

}

export default Counter
