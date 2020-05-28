import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import About from './components/About'
import NavBar from './components/NavBar'
import Users from './components/Users'
import User from './components/User'
import Search from './components/Search'
import Alert from './components/Alert'
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className='App'>
						<NavBar />
						<div className='container'>
							<Alert alert={alert} />
							<Switch>
								<Route
									exact
									path='/'
									render={() => {
										return (
											<Fragment>
												<Search />
												<Users />
											</Fragment>
										)
									}}
								/>
								<Route path='/about' component={About} />
								<Route path='/user/:login' component={User} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	)
}

export default App
