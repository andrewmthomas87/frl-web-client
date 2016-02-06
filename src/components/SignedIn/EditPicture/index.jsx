import React, { Component, PropTypes } from 'react'

import history from 'services/history'
import socket from 'services/socket'

import './EditPicture.less'

class EditPicture extends Component {

	static propTypes = {
		addToast: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			preview: null
		}
	}

	render() {
		const preview = this.state.preview

		const previewElement = preview ? <div id='preview' style={{backgroundImage: `url('${preview}')`}}></div> : null

		return (
			<div id='editPicture' className='page'>
				<h1>Update picture</h1>
				{previewElement}
				<form onSubmit={this.update}>
					<input type='file' accept='image/*' onChange={this.fileChanged} ref='file' />
					<button type='submit'>Update</button>
				</form>
			</div>
		)
	}

	fileChanged = () => {
		const files = this.refs.file.files
		if (files.length) {
			const file = files[0]

			if (file.size > 65535) {
				this.props.addToast(<div>File size must be less than 65 kilobytes</div>)

				this.refs.file.value = ''
				this.setState({
					preview: null
				})
			}
			else {
				const reader = new FileReader()

				reader.addEventListener('load', () => {
					this.setState({
						preview: reader.result
					})
				})

				reader.readAsDataURL(this.refs.file.files[0])
			}
		}
		else {
			this.refs.file.value = ''
			this.setState({
				preview: null
			})
		}
	}

	update = (event) => {
		event.preventDefault()

		const files = this.refs.file.files

		if (files.length) {
			const file = files[0]

			if (file.size > 65535) {
				this.props.addToast(<div>File size must be less than 65 kilobytes</div>)

				this.refs.file.value = ''
				this.setState({
					preview: null
				})
			}
			else {
				socket.send('User.updatePicture', file).then((message) => {
					this.props.addToast(<div>{message}</div>)

					history.pushState({}, '/user/profile')
				}).catch((error) => {
					this.props.addToast(<div>{error.error}</div>)
				})
			}
		}
		else {
			socket.send('User.updatePicture', false).then((message) => {
				this.props.addToast(<div>{message}</div>)

				history.pushState({}, '/user/profile')
			}).catch((error) => {
				this.props.addToast(<div>{error.error}</div>)
			})
		}
	}

}

export default EditPicture
