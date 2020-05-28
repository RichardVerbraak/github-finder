import React, { useReducer } from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../../types'

const AlertState = (props) => {
	const initialState = {
		alert: null,
	}

	const [state, dispatch] = useReducer(AlertReducer, initialState)

	// If the onSubmit e.target doesn't have any text (in the Search comp) then this func gets called with the message and type 'light' for styling of the button
	// Goes away after 5 seconds
	const setAlert = (msg, style) => {
		dispatch({
			type: SET_ALERT,
			payload: {
				msg,
				style,
			},
		})
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: null }), 5000)
	}

	return (
		<AlertContext.Provider
			value={{
				alert: state.alert,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	)
}

export default AlertState
