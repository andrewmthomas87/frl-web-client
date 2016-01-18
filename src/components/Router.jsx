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
import Events from 'components/SignedIn/Events'
import Event from 'components/SignedIn/Event'
import Users from 'components/SignedIn/Users'
import User from 'components/SignedIn/User'
import Profile from 'components/SignedIn/Profile'
import EditProfile from 'components/SignedIn/EditProfile'
import SignOut from 'components/SignedIn/SignOut'

import Admin from 'components/Admin'
import AdminDashboard from 'components/Admin/Dashboard'
import Draft from 'components/Admin/Draft'

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
			<Route path='events' component={Events} />
			<Route path='event/:code' component={Event} />
			<Route path='users' component={Users} />
			<Route path='user/:id' component={User} />
			<Route path='profile' component={Profile} />
			<Route path='profile/edit' component={EditProfile} />
			<Route path='sign-out' component={SignOut} />
		</Route>
		<Route path='/admin' component={Admin} onEnter={requireSignedIn}>
			<IndexRoute component={AdminDashboard} />
			<Route path='draft' component={Draft} />
		</Route>
		<Route path='*' component={NotFound} />
	</Router>
)

export default router
