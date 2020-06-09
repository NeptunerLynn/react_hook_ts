import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../components/views/HomePage';
import LoginPage from '../components/views/LoginPage';
import RegisterPage from '../components/views/RegisterPage';

const basename = '/';

const RoutersConfig = () => {
    return (
        <Router basename={basename}>
            <Switch>
                <Route path='/login' exact={true} component={LoginPage} />
                <Route path='/home' component={HomePage} />
                <Route path='/register' component={RegisterPage} />
                <Redirect to='/login' />
            </Switch>
        </Router>
    );
}

export default RoutersConfig;