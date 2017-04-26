const {createStore} = require('../utils/StoreUtils'),
  ActionTypes = require('../constants/ActionTypes'),
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  config = require('../../../config');

let _token = '';
let AuthStore = createStore({
  get(){
    return _token;
  },
  set(token){
    _token = token;
  }
})

AuthStore.dispatcherToken = AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case ActionTypes.USER_AUTH_SUCCESS:
      console.log(action.response.body)
      _token = action.response.body;
      AuthStore.emitChange();
      break;
    default:
    // do nothing

  }
});

module.exports = AuthStore;
