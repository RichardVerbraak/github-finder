import React, { useState } from 'react'
import PropTypes from 'prop-types'

// If you dont use arrow functions you have to bind 'this' to the method

const Search = ({ showClear, clearUsers, searchUsers, setAlert }) => {
	const [text, setText] = useState('')

	// Use [e.target.name] instead of having multiple onChange functions if you would have multiple input fields like email or password
	const onChange = (e) => {
		setText(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (text === '') {
			setAlert('Please enter something', 'light')
		} else {
			searchUsers(text)
			setText('')
		}
	}
	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{showClear && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	)
}

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
}

export default Search
