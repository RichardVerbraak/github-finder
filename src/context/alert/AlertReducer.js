import { SET_ALERT, REMOVE_ALERT } from '../../types'

const AlertReducer = (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				alert: action.payload,
			}
		case REMOVE_ALERT:
			return {
				alert: action.payload,
			}
		default:
			return state
	}
}

export default AlertReducer
