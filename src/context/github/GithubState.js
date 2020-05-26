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
import githubContext from './GithubContext'

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(GithubReducer, initialState)

	// Search Users

	return (
		<GithubContext.Provider
			value={{
				users: state.user,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	)
}

export default GithubState
