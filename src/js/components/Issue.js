const React = require('react');
class Issue extends React.Component {
    render() {
        let {issues} = this.props;
        if (_.isEmpty(issues)) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ul>
                        {issues.map(issue =>
                                <li key={issue.id}>{issue.title}</li>
                        )}
                    </ul>
                </div>
            );
        }
    }
}

module.exports = Issue;