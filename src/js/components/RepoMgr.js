const React = require('react');
class Issue extends React.Component {
  render() {
    let {repo} = this.props;
    return (
      <div>
        <ul>
          <p> World </p>
        </ul>
      </div>
    );
  }
}

module.exports = Issue;