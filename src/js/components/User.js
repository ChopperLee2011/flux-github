'use strict';

const React = require('react'),
    UserStore = require('../stores/UserStore'),
    ActionCreator = require('../actions/ActionCreators'),
    _ = require('lodash');

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
        console.info('user', user);
        if (_.isEmpty(user)) {
            return (
                <div>
                    None!
                </div>
            );
        } else {
            return (
                <div>
                    <p>{user.me}</p>

                    <p> Organizations </p>
                    <ul>
            {user.orgs.map(org =>
                    <li key={org.id}>{org.login}</li>
            )}
                    </ul>
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