const React = require('react'),
  Router = require('react-router'),
  ActionCreators = require('../actions/ActionCreators'),
  querystring = require('querystring'),
  {EventEmitter} = require('events'),
  axios = require('axios');

var Login = React.createClass({
  handleLogin() {
    let access_token
    let client_id = '59de5143a39738a35012'
    let client_secret = 'c51887ccbc254ad0be49ab58468f54aefad3589a'
    let popWin = window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}`,
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
      axios.post('https://github.com/login/oauth/access_token',
        {code: code, client_id: client_id, client_secret: client_secret})
        .then((res) => {
          console.log('get access_token:')
          access_token = res.data.access_token
          this.setState({access_token: res.data.access_token});
          return access_token
        })
        .then((res) => {
          axios.get(`https://api.github.com/user?access_token=${res}`)
            .then((res) => {
              let {name, avatar_url, email} = res.data
              this.setState({
                name: name, avatar_url: avatar_url, email: email
              })
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