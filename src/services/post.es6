import request from 'superagent/lib/client'

import config from '../config'

function post(endpoint, data, headers={}) {
	return new Promise((resolve, reject) => {
		const req = request.post(config.api + endpoint, data)

		for (let header of Object.keys(headers)) {
			req.set(header, headers[header])
		}

		req.end((error, response) => {
			if (error) {
				reject(Error(error.message))
			}
			else {
				resolve(response)
			}
		})
	})
}

export default post
