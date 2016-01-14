import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './Navigation.less'

class Navigation extends Component {

	static propTypes = {
		links: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			menuVisible: false
		}
	}

	render() {
		const menu = this.state.menuVisible ? (
			<div key={0} id='menu'>
				{this.props.links.map(link => <Link key={link.name} to={link.link}>{link.name}</Link>)}
			</div>
		) : null

		return (
			<nav>
				<div id='logo'>
					<Link to='/'>FRL</Link>
				</div>
				<div id='links' className={this.state.menuVisible ? 'active' : null} onClick={this.toggle}>
					Menu
					<svg fill='#fff' height='48' viewBox='0 0 48 48' width='48' xmlns='http://www.w3.org/2000/svg'><path d='M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z'/><path d='M0-.75h48v48H0z' fill='none'/></svg>
					<ReactCSSTransitionGroup transitionName='menu' transitionEnterTimeout={125} transitionLeaveTimeout={125}>
						{menu}
					</ReactCSSTransitionGroup>
				</div>
			</nav>
		)
	}

	toggle = () => {
		this.setState({
			menuVisible: !this.state.menuVisible
		})
	}

}

export default Navigation
