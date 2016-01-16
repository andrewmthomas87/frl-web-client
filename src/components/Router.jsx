import React, { Component } from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import history from 'services/history'
import session from 'services/session'

import NotFound from 'components/global/NotFound'

import SignedOut from 'components/SignedOut'
import Home from 'components/SignedOut/Home'
import About from 'components/SignedOut/About'
import SignUp from 'components/SignedOut/SignUp'
import SignIn from 'components/SignedOut/SignIn'

import SignedIn from 'components/SignedIn'
import Dashboard from 'components/SignedIn/Dashboard'
import Research from 'components/SignedIn/Research'
import Teams from 'components/SignedIn/Teams'
import Team from 'components/SignedIn/Team'
import Event from 'components/SignedIn/Event'
import SignOut from 'components/SignedIn/SignOut'

function requireSignedOut(nextState, replaceState) {
	if (session.signedIn()) {
		replaceState({}, '/user')
	}
}

function requireSignedIn(nextState, replaceState) {
	if (!session.signedIn()) {
		replaceState({ nextPathname: nextState.location.pathname }, '/sign-in')
	}
}

const router = (
	<Router history={history}>
		<Route path='/' component={SignedOut} onEnter={requireSignedOut}>
			<IndexRoute component={Home} />
			<Route path='about' component={About} />
			<Route path='sign-up' component={SignUp} />
			<Route path='sign-in' component={SignIn} />
		</Route>
		<Route path='/user' component={SignedIn} onEnter={requireSignedIn}>
			<IndexRoute component={Dashboard} />
			<Route path='research' component={Research} />
			<Route path='teams' component={Teams} />
			<Route path='team/:teamNumber' component={Team} />
			<Route path='event/:code' component={Event} />
			<Route path='sign-out' component={SignOut} />
		</Route>
		<Route path='*' component={NotFound} />
	</Router>
)

export default router
