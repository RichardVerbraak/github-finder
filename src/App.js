import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import About from './components/About'
import NavBar from './components/NavBar'
import Users from './components/Users'
import User from './components/User'
import Search from './components/Search'
import Alert from './components/Alert'

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	}

	// Could delete
	// async componentDidMount() {
	// 	this.setState({ loading: true })

	// 	const response = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	)

	// 	this.setState({ users: response.data, loading: false })
	// }

	// Search GitHub users
	searchUsers = async (text) => {
		this.setState({ loading: true })

		const response = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		this.setState({ users: response.data.items, loading: false })
	}

	// Get single user details
	getUser = async (username) => {
		this.setState({ loading: true })

		const response = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		this.setState({ user: response.data, loading: false })
	}

	// Gets the users repos
	getUserRepos = async (username) => {
		this.setState({ loading: true })

		const response = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)

		this.setState({ repos: response.data, loading: false })
	}

	// Clear users from array
	clearUsers = () => {
		this.setState({ users: [], loading: false })
	}

	// If the onSubmit e.target doesn't have any text (in the Search comp) then this func gets called with the message and type 'light' for styling of the button
	// Goes away after 5 seconds
	setAlert = (msg, type) => {
		this.setState({
			alert: {
				msg,
				type,
			},
		})
		setTimeout(() => {
			this.setState({ alert: null })
		}, 5000)
	}

	render() {
		const { users, loading, user, repos } = this.state

		return (
			<Router>
				<div className='App'>
					<NavBar />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => {
									return (
										<Fragment>
											<Search
												searchUsers={this.searchUsers}
												clearUsers={this.clearUsers}
												showClear={users.length > 0 ? true : false}
												setAlert={this.setAlert}
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
											getUser={this.getUser}
											getUserRepos={this.getUserRepos}
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
		)
	}
}

export default App
