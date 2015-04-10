const React = require('react'),
    Router = require('react-router'),
    userName = require('../../../config').USER_NAME;
var Login = React.createClass({
    mixins: [Router.Navigation, Router.State],
    handleLogin() {
        this.transitionTo('/' + userName);
    },
    render() {
        return (
            <div className='container'>
                <div className='col-md-4'>
                    <button onClick={this.handleLogin}>Sign in with Github</button>
                </div>
            </div>
        );
    }
});

export default Login;