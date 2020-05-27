import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from './Spinner'
import Repos from './Repos'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'

const User = ({ loading, repos, getUserRepos, match }) => {
	const githubContext = useContext(GithubContext)

	// Empty set of [] is mimicking componentDidMount (only running once)
	// Because in the brackets you can specify when it should update for instance on repos like so : [repos]
	useEffect(() => {
		githubContext.getUser(match.params.login)
		getUserRepos(match.params.login)
		// Removes the warning message about using dependecies in the brackets (no need since we only want it to run when mounted)
		// eslint-disable-next-line
	}, [])

	const {
		name,
		avatar_url,
		location,
		company,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = githubContext.user

	if (loading) {
		return <Spinner />
	}

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back to Search
			</Link>
			Hireable: {''}
			{hireable ? (
				<i className='fas fa-check text-danger' />
			) : (
				<i className='fas fa-check text-success' />
			)}
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={avatar_url}
						alt='avatar'
						className='round-img'
						style={{ width: '150px' }}
					/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>

				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className='btn btn-dark my-1'>
						Visit Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: {login}</strong>
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company: {company}</strong>
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Website: {blog}</strong>
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				<div className='badge badge-primary'>Followers: {followers}</div>
				<div className='badge badge-success'>Following: {following}</div>
				<div className='badge badge-light'>Public Repos: {public_repos}</div>
				<div className='badge badge-dark'>Public Gists: {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	)
}

User.propTypes = {
	repos: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	getUserRepos: PropTypes.func.isRequired,
}

export default User
