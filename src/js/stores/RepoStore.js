const {createStore} = require('../utils/StoreUtils'),
    ActionTypes = require('../constants/ActionTypes'),
    AppDispatcher = require('../dispatcher/AppDispatcher');
let _repos = {};
let RepoStore = createStore({
    get() {
        return _repos;
    }
});
RepoStore.dispatcherToken = AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.type) {
        case ActionTypes.GET_REPO_SUCCESS:
            _repos = action.response.body;
            RepoStore.emitChange();
            break;
        default:
        // do nothing

    }
});
module.exports = RepoStore;