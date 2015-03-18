'use strict';

const React = require('react'),
    RepoStore = require('../stores/RepoStore'),
    ActionCreator = require('../actions/ActionCreators'),
    _ = require('lodash');

let Repo = React.createClass({

    getStateFromStores() {
        let repos = RepoStore.get();
        return {
            repos
        };
    },
    componentWillMount() {
        this._onInit();
        RepoStore.addChangeListener(this._onChange);
    },
    componentWillReceiveProps() {
        this.setState(this.getStateFromStores());
    },

    render() {
        let {repos} = this.state;
        if (_.isEmpty(repos)) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ul>
            {repos.map(repo =>
                    <li key={repo.id}>{repo.name}</li>
            )}
                    </ul>
                </div>
            );
        }
    },

    _onInit() {
        ActionCreator.getUserRepo();
        this.setState(this.getStateFromStores());

    },
    _onChange() {
        this.setState(this.getStateFromStores());
    }
});

module.exports = Repo;