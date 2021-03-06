import React, { useState, useContext } from 'react'
import GithubContext from '../context/github/GithubContext'
import AlertContext from '../context/alert/AlertContext'

// If you dont use arrow functions you have to bind 'this' to the method

const Search = () => {
	const githubContext = useContext(GithubContext)
	const { clearUsers, users } = githubContext

	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

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
			githubContext.searchUsers(text)
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
			{users.length > 0 && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	)
}

export default Search
