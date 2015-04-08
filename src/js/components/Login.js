const React = require('react'),
    Router = require('react-router');
let Login = React.createClass({
    mixins: [Router.Navigation, Router.State],
    handleLogin() {
        const userName = 'chopperlee2011';
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