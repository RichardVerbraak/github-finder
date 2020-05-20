import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

import NavBar from './components/NavBar'
import Users from './components/Users'
import Search from './components/Search'

class App extends Component {
	state = {
		users: [],
		loading: false,
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

	render() {
		return (
			<div className='App'>
				<NavBar />
				<div className='container'>
					<Search searchUsers={this.searchUsers} />
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		)
	}
}

export default App
