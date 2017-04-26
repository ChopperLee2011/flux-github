const React = require('react'),
    UserStore = require('../stores/UserStore'),
    RepoStore = require('../stores/RepoStore'),
    AuthStore = require('../stores/AuthStore'),
    ActionCreators = require('../actions/ActionCreators'),
    Repo = require('./Repo'),
    _ = require('lodash'),
    {Link} = require('react-router');

class User extends React.Component {

    getStateFromStores() {
        let user = UserStore.get(),
            repos = RepoStore.get(),
            token = AuthStore.get();
        return {
            user,
            repos,
            token
        };
    }

    componentWillMount() {
        this._onInit();
        UserStore.addChangeListener(this._onChange.bind(this));
        RepoStore.addChangeListener(this._onChange.bind(this));
    }


    //componentWillUnmount() {
    //    UserStore.removeEventListener(this._onChange);
    //    RepoStore.removeEventListener(this._onChange);
    //},

    //componentWillReceiveProps() {
    //    this.setState(this.getStateFromStores());
    //},

    render() {
        let {user,repos, token } = this.state;
        console.log('User page token',token)
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
                        <a onClick={this._getUserRepo.bind(this)} value={user.me}>{user.me}</a>

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
                    <div className="repoList">
                        <p>Repositories</p>
                        <Repo repos={repos} username={user.me}/>
                    </div>
                </div>
            );
        }
    }


    _onInit() {
        ActionCreators.getUser();
        this.setState(this.getStateFromStores());

    }


    _onChange() {
        this.setState(this.getStateFromStores());
    }


    _getUserRepo() {
        event.preventDefault();
        ActionCreators.getRepo('user', this.state.user.me);
    }

    _getOrgRepo(event) {
        event.preventDefault();
        ActionCreators.getRepo('org', event.target.dataset.tag);
    }
}

module.exports = User;