'use strict';
const React = require('react'),
    Router = require('react-router'),
    App = require('./App'),
    Login = require('./js/components/Login'),
    User = require('./js/components/User'),
    Repo = require('./js/components/Repo'),
    { Route } = Router;

let About = React.createClass({
    render() {
        return <h1>About</h1>;
    }
});

let routes = (
    <Route handler={App}>
        <Route name='login' handler={Login} />
        <Route name='about' handler={About} />
        <Route name='user' path='/:userName' handler={User} />
        <Route name='repo' path='/:userName/repo' handler={Repo} />
    </Route>
);
Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});