import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/pages/LoginPage';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
            <Route path="/app" component={App} />
            <Route path="/login" component={Login} />
            <Route component={Login} />
        </Switch>
    </Router>
);
