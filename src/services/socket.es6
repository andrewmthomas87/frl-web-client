import io from 'socket.io-client'

import config from '../config'

class Socket {

	constructor() {
		this.socket = null
	}

	connect(token) {
		return new Promise((resolve, reject) => {
			if (this.socket) {
				this.socket.connect()
			}
			else if (config.socket) {
				this.socket = io(config.socket)
			}
			else {
				this.socket = io()
			}

			this.socket.emit('authenticate', {
				token: token
			})

			const connectListener = () => {
				resolve()
				this.socket.removeListener('connect', connectListener)
				this.socket.removeListener('unauthorized', unauthorizedListener)
			}

			const unauthorizedListener = () => {
				reject()
				this.socket.removeListener('connect', connectListener)
				this.socket.removeListener('unauthorized', unauthorizedListener)
			}

			this.socket.on('authenticated', connectListener)
			this.socket.on('disconnect', unauthorizedListener)
		})
	}

	connected() {
		if (!this.socket) {
			return false
		}

		return this.socket.connected
	}

	disconnect() {
		if (this.connected()) {
			this.socket.disconnect()
		}
	}

	emit(event, data) {
		this.socket.emit(event, data)
	}

	send(event, data) {
		return new Promise((resolve, reject) => {
			const listener = (data) => {
				this.unsubscribe(event, listener)

				if (data.error) {
					reject(data)
				}
				else {
					resolve(data)
				}
			}

			this.subscribe(event, listener)

			this.emit(event, data)
		})
	}

	subscribe(event, listener) {
		this.socket.on(event, listener)
	}

	unsubscribe(event, listener) {
		if (listener) {
			this.socket.removeListener(event, listener)
		}
		else {
			this.socket.removeAllListeners(event)
		}
	}

}

const socket = new Socket()

export default socket
