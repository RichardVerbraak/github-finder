import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'

export const Alert = () => {
	const alertContext = useContext(AlertContext)
	const { alert } = alertContext
	if (alert !== null) {
		return (
			<div className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle'></i> {alert.msg}
			</div>
		)
	} else {
		return null
	}
}

export default Alert
