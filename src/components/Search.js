import React, { Component } from 'react'

// If you dont use arrow functions you have to bind 'this' to the method

export class Search extends Component {
	state = {
		text: '',
	}

	// Use [e.target.name] instead of having multiple onChange functions if you would have multiple input fields like email or password
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = (e) => {
		e.preventDefault()
		this.props.searchUsers(this.state.text)
		this.setState({ text: '' })
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} className='form'>
					<input
						type='text'
						name='text'
						placeholder='Search Users...'
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
			</div>
		)
	}
}

export default Search
