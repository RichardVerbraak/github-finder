import React from 'react'
import propTypes from 'prop-types'

const UserItem = ({ user: { avatar_url, login, html_url } }) => {
	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt='Avatar'
				className='round-img'
				style={{ width: '60px' }}
			/>
			<h3>{login}</h3>
			<div>
				<a href={html_url} className='btn btn-dark btn-sm my-1'>
					More
				</a>
			</div>
		</div>
	)
}

UserItem.propTypes = {
	user: propTypes.object.isRequired,
}

export default UserItem
