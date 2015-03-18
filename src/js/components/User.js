'use strict';

const React = require('react'),
    UserStore = require('../stores/UserStore'),
    ActionCreator = require('../actions/ActionCreators'),
    _ = require('lodash'),
    {Link} = require('react-router');

let User = React.createClass({

    getStateFromStores() {
        let user = UserStore.get();
        return {
            user
        };
    },
    componentWillMount() {
        this._onInit();
        UserStore.addChangeListener(this._onChange);
    },
    componentWillReceiveProps() {
        this.setState(this.getStateFromStores());
    },

    render() {
        let {user} = this.state;
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
                        <Link to="repo" params={{userName: user.me}}>{user.me}</Link>
                        <p> Organizations </p>
                    </div>
                    <div className="orgList">
                        <ul>
            {user.orgs.map(org =>

                    <li key={org.id}>
                        <Link to="repo" params={{userName: org.login}}>
                        {org.login}
                        </Link>
                    </li>
            )}
                        </ul>
                    </div>
                </div>
            );
        }
    },

    _onInit() {
        ActionCreator.getUser();
        this.setState(this.getStateFromStores());

    },
    _onChange() {
        this.setState(this.getStateFromStores());
    }
});

module.exports = User;