import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import About from './components/About'
import NavBar from './components/NavBar'
import Alert from './components/Alert'
import User from './components/User'
import Home from './components/Home'
import NotFound from './components/NotFound'

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
								<Route exact path='/' component={Home} />
								<Route path='/about' component={About} />
								<Route path='/user/:login' component={User} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	)
}

export default App
