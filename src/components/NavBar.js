import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Use Link tags instead of an <a> tag to keep the state on the previous page, otherwise it would 'refresh' the state
const NavBar = ({ title, icon }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
			</ul>
		</nav>
	)
}

NavBar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github',
}

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
}

export default NavBar
