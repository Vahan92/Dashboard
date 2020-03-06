import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Register from './components/registration';
import Panel from './components/panel';
import Login from './components/login';
import LoginRegister from './components/loginRegister';


const Routes = () => (
	<Router>
		<Switch>
			{!localStorage.getItem("jwt") && [<Route path="/" exact component={LoginRegister} />,
			<Route path="/register" component={Register} />,
			<Route path="/login" component={Login} />]}
			{localStorage.getItem("jwt") ? <Route path="/panel" exact component={Panel} /> :
				<Redirect to="/" />}
		</Switch>
	</Router>
);

export default Routes;
