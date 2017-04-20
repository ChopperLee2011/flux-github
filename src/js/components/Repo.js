const React = require('react'),
    ActionCreators = require('../actions/ActionCreators'),
    Report = require('./DailyIssueReport'),
    IssueStore = require('../stores/IssueStore');

class Repo extends React.Component {
    getStateFromStores() {
        let reports = {
            closed: IssueStore.getByStatus('closed'),
            wip: IssueStore.getByStatus('wip')
        }
        return {
          reports
        };
    }
    componentWillMount() {
        this.setState(this.getStateFromStores());
        IssueStore.addChangeListener(this._onChange.bind(this));
    }
    render() {
        let {repos} = this.props,
            {reports} = this.state;
        console.log('reports',reports)
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
                                <li key={repo.id}>
                                    <a onClick={this._getIssue} data-tag={repo.url}>{repo.name}
                                    </a>
                                </li>
                        )}
                    </ul>
                    <div className="issueList">
                        <p> Daily Issue Report </p>
                        <Report reports={reports}/>
                    </div>
                </div>
            );
        }
    }
    _getIssue(event) {
        event.preventDefault();
        ActionCreators.getIssue(event.target.dataset.tag);
    }

    _onChange() {
        this.setState(this.getStateFromStores());
    }
}

module.exports = Repo;