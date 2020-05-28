import React from 'react'
import RepoItem from './RepoItem'

export const Repos = ({ repos }) => {
	return repos.map((repo) => {
		return <RepoItem repo={repo} key={repo.id} />
	})
}

export default Repos
