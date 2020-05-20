import React from 'react'
import RepoItem from './RepoItem'
import PropTypes from 'prop-types'

export const Repos = ({ repos }) => {
	return repos.map((repo) => {
		return <RepoItem repo={repo} key={repo.id} />
	})
}

Repos.PropTypes = {
	repos: PropTypes.array.isRequired,
}

export default Repos
