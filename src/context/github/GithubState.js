// File where the requests will be made instead of doing it in App.js
// Similiar to Redux

import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './GithubContext'
import GithubReducer from './GithubReducer'
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_REPOS,
	SET_ALERT,
	GET_USER,
} from '../../types'

// GithubState is where the state lives and will wrap the entire App so you have access to state in every component when you use - useContext

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(GithubReducer, initialState)

	// Search Users
	const searchUsers = async (text) => {
		setLoading()

		const response = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		dispatch({
			type: SEARCH_USERS,
			payload: response.data.items,
		})
	}

	// Get User
	const getUser = async (username) => {
		setLoading()

		const response = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		dispatch({
			type: GET_USER,
			payload: response.data,
		})
	}

	// Get Repos
	const getUserRepos = async (username) => {
		setLoading()

		const response = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		console.log(response.data)
		dispatch({
			type: GET_REPOS,
			payload: response.data,
		})
	}

	// Clear Users
	const clearUsers = () => {
		return dispatch({
			type: CLEAR_USERS,
		})
	}

	// Set Loading
	const setLoading = () => {
		return dispatch({
			type: SET_LOADING,
		})
	}

	// Everything thats in the value is what can be accessed throughout all components by doing the following:
	// 1. import GithubContext and useContext
	// 2. Create a variable with a name like, const githubContext = useContext(GitHubContext)
	// Now you have access with githubContext.users or .loading or whatever is in the value
	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	)
}

export default GithubState
