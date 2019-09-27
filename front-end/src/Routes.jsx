import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/registration';
import Panel from './components/panel';
import Login from './components/login';


const Routes = () => (
	<Router>
		<Switch>
			<Route path="/" exact component={Panel} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
		</Switch>
	</Router>
);

export default Routes;
