const React = require('react');
var Issue = React.createClass({
  render() {
    let {reports} = this.props;
    console.log(reports)
    if (_.isEmpty(reports)) {
      return (
        <div>
          Loading...
        </div>
      );
    } else {
      return (
        <div>
          * closed
          <ul>
            { !_.isEmpty(reports.closed) && reports.closed.map(issue =>
              <li key={issue.id}>{issue.title}/{issue.html_url}</li>
            )}
          </ul>
          * wip
          <ul>
            { !_.isEmpty(reports.wip) && reports.wip.map(issue =>
              <li key={issue.id}>{issue.title}/{issue.html_url}</li>
            )}
          </ul>
        </div>
      );
    }
  }
});

module.exports = Issue;