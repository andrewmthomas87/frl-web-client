import post from 'services/post'
import socket from 'services/socket'

class Session {

	_fetchToken(email, password) {
		return new Promise((resolve, reject) => {
			post('/signIn', {
				email: email,
				password: password
			}).then((response) => {
				if (response.body.token) {
					localStorage.token = response.body.token
					resolve()
				}
				else {
					reject(response.body.error)
				}
			}).catch(() => {
				reject('Server error')
			})
		})
	}

	_signUp(firstName, lastName, email, position, password) {
		return new Promise((resolve, reject) => {
			post('/signUp', {
				firstName: firstName,
				lastName: lastName,
				email: email,
				position: position,
				password: password
			}).then((response) => {
				if (response.body.token) {
					localStorage.token = response.body.token
					resolve()
				}
				else {
					reject(response.body.errors)
				}
			}).catch(() => {
				reject(['Server error'])
			})
		})
	}

	getToken() {
		return localStorage.token
	}

	signedIn() {
		return !!localStorage.token
	}

	signIn(email, password) {
		return new Promise((resolve, reject) => {
			if (email && password) {
				this._fetchToken(email, password).then(resolve).catch(reject)
			}
			else {
				reject('Invalid inputs')
			}
		})
	}

	signUp(firstName, lastName, email, position, password) {
		return new Promise((resolve, reject) => {
			if (firstName && lastName && email && position && password) {
				this._signUp(firstName, lastName, email, position, password).then(resolve).catch(reject)
			}
			else {
				reject(['Invalid inputs'])
			}
		})
	}

	signOut() {
		delete localStorage.token
	}

}

const session = new Session()

export default session
