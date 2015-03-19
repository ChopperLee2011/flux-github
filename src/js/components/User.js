'use strict';

const React = require('react'),
    UserStore = require('../stores/UserStore'),
    RepoStore = require('../stores/RepoStore'),
    ActionCreators = require('../actions/ActionCreators'),
    Repo = require('./Repo'),
    _ = require('lodash'),
    {Link} = require('react-router');

let User = React.createClass({

    getStateFromStores() {
        let user = UserStore.get(),
            repos = RepoStore.get();
        return {
            user,
            repos
        };
    },
    componentWillMount() {
        this._onInit();
        UserStore.addChangeListener(this._onChange);
        RepoStore.addChangeListener(this._onChange);
    },

    //componentWillUnmount() {
    //    UserStore.removeEventListener(this._onChange);
    //    RepoStore.removeEventListener(this._onChange);
    //},

    //componentWillReceiveProps() {
    //    this.setState(this.getStateFromStores());
    //},

    render() {
        let {user,repos} = this.state;
        if (_.isEmpty(user)) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="user">
                    <div className="userList">
                        <a onClick={this._getUserRepo} value={user.me} >{user.me}</a>
                        <p> Organizations </p>
                    </div>
                    <div className="orgList">
                        <ul>
            {user.orgs.map(org =>
                    <li key={org.id}>
                        <a onClick={this._getOrgRepo} data-tag={org.login}>
                        {org.login}
                        </a>
                    </li>
            )}
                        </ul>
                    </div>
                    <p> Repositories </p>
                    <div className="repoList">
                        <Repo repos={repos}/>
                    </div>
                </div>
            );
        }
    },

    _onInit() {
        ActionCreators.getUser();
        this.setState(this.getStateFromStores());

    },
    _onChange() {
        this.setState(this.getStateFromStores());
    },
    _getUserRepo() {
        event.preventDefault();
        ActionCreators.getRepo('user', this.state.user.me);
    },
    _getOrgRepo(event) {
        event.preventDefault();
        //console.info('event.target.dataset.tag',event.target.dataset.tag);

        ActionCreators.getRepo('org', event.target.dataset.tag);
    }
});

module.exports = User;