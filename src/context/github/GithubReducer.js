import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_REPOS,
	GET_USER,
} from '../../types'

// Useful console.log to have when creating actions and reducers
// console.log(`Dispatched: ${action.type} Payload:`, action.payload)

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		case SEARCH_USERS:
			// console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				users: action.payload,
				loading: false,
			}
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false,
			}
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false,
			}
		case GET_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false,
			}
		default:
			return state
	}
}
