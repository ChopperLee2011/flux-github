const {createStore} = require('../utils/StoreUtils'),
    ActionTypes = require('../constants/ActionTypes'),
    AppDispatcher = require('../dispatcher/AppDispatcher');
let _user = {};
let UserStore = createStore({
    get() {
        return _user;
    }
});
UserStore.dispatcherToken = AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.type) {
        case ActionTypes.GET_USER_SUCCESS:
            _user = action.response;
            UserStore.emitChange();
            break;
        default:
        // do nothing

    }
});
module.exports = UserStore;