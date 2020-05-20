import React from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import UserItem from './UserItem'

const Users = ({ users, loading }) => {
	if (loading) {
		return <Spinner />
	} else {
		return (
			<div style={userStyle}>
				{users.map((user) => {
					return <UserItem key={user.id} user={user} />
				})}
			</div>
		)
	}
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
}

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
}

export default Users
