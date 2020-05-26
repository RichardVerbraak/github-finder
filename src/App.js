import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import About from './components/About'
import NavBar from './components/NavBar'
import Users from './components/Users'
import User from './components/User'
import Search from './components/Search'
import Alert from './components/Alert'
import GithubState from './context/github/GithubState'

const App = (props) => {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(null)

	// Search GitHub users
	const searchUsers = async (text) => {
		setLoading(true)

		const response = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		setUsers(response.data.items)
		setLoading(false)
	}

	// Get single user details
	const getUser = async (username) => {
		setLoading(true)

		const response = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		setUser(response.data)
		setLoading(false)
	}

	// Gets the users repos
	const getUserRepos = async (username) => {
		setLoading(true)

		const response = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		setRepos(response.data)
		setLoading(false)
	}

	// Clear users from array
	const clearUsers = () => {
		setUsers([])
		setLoading(false)
	}

	// If the onSubmit e.target doesn't have any text (in the Search comp) then this func gets called with the message and type 'light' for styling of the button
	// Goes away after 5 seconds
	const changeAlert = (msg, type) => {
		setAlert({ msg, type })
		setTimeout(() => {
			setAlert(null)
		}, 5000)
	}
	return (
		<GithubState>
			<Router>
				<div className='App'>
					<NavBar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => {
									return (
										<Fragment>
											<Search
												searchUsers={searchUsers}
												clearUsers={clearUsers}
												showClear={users.length > 0 ? true : false}
												setAlert={changeAlert}
											/>
											<Users loading={loading} users={users} />
										</Fragment>
									)
								}}
							/>
							<Route path='/about' component={About} />
							<Route
								path='/user/:login'
								render={(props) => {
									return (
										<User
											user={user}
											getUser={getUser}
											getUserRepos={getUserRepos}
											repos={repos}
											{...props}
										/>
									)
								}}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	)
}

export default App
