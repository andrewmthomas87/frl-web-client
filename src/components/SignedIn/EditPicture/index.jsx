import React, { Component, PropTypes } from 'react'

import socket from 'services/socket'

class EditPicture extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	render() {
		return (
			<div id='editPicture' className='page'>
				<h1>Update picture</h1>
			</div>
		)
	}

}

export default EditPicture
