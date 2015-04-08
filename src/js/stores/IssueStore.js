const {createStore} = require('../utils/StoreUtils'),
    ActionTypes = require('../constants/ActionTypes'),
    AppDispatcher = require('../dispatcher/AppDispatcher');
let _issues = {};
let IssueStore = createStore({
    get() {
        return _issues;
    }
});
IssueStore.dispatcherToken = AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.type) {
        case ActionTypes.GET_ISSUE_SUCCESS:
            _issues = action.response.body;
            IssueStore.emitChange();
            break;
        default:
        // do nothing

    }
});
module.exports = IssueStore;