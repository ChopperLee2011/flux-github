const React = require('react'),
  Router = require('react-router'),
  ActionCreators = require('../actions/ActionCreators'),
  AuthStore = require('../stores/AuthStore'),
  querystring = require('querystring'),
  {EventEmitter} = require('events'),
  Config = require('../../../config'),
  axios = require('axios');

var Login = React.createClass({
  mixins: [Router.Navigation, Router.State],
  handleLogin() {
    let access_token
    let client_id = Config.clientId
    let popWin = window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo_deployment%20read:org%20public_repo%20user`,
      null, "width=600,height=400")
    let code
    let eventEmitter = new EventEmitter();

    let checkCode = () => {
      try {
        let query = popWin.location.search.substring(1)

        code = querystring.parse(query).code

        if ((typeof code) !== 'undefined') {
          clearInterval(intervalId)
          popWin.close()
          eventEmitter.emit('code', code);
        }
      } catch (err) {}
    }

    let intervalId = setInterval(checkCode, 1000);

    eventEmitter.on('code', (code) => {
      console.log('get code:' + code)
      axios.get(`/githubToken?code=${code}`)
        .then((res) => {
          access_token = res.data.access_token
          console.log('access_token', access_token)
          this.setState({access_token: res.data.access_token});
          return access_token
        })
        .then((res) => {
          AuthStore.set(res)
          axios.get(`https://api.github.com/user?access_token=${res}`)
            .then((res) => {
              let {name, avatar_url, email, login} = res.data
              this.setState({
                name: name, avatar_url: avatar_url, email: email,
              })
              this.transitionTo('/' + login);
            })
        });
    })
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