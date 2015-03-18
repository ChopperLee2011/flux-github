'use strict';
const React = require('react'),
    Router = require('react-router'),
    App = require('./App'),
    Login = require('./js/components/Login'),
    User = require('./js/components/User'),
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
        <Route name='user' path='/:userName' handle={User} />
    </Route>
);
Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});