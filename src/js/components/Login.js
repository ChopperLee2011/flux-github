'use strict';
const React = require('react'),
    GithubAPI = require('../api/GithubAPI');
let Login = React.createClass({
    handleLogin() {
        const userName = 'chopperlee2011';
        new GithubAPI.getUser().orgs().then(
            function (value) {
                console.info('Contents: ', value);
                this.transitionTo('/' + userName);
            }, function (reason) {
                console.error('Something went wrong', reason);
            }
        );
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