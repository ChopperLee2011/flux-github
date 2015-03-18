'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionType = require('../constants/ActionTypes'),
    GithubAPI = require('../api/GithubAPI');

export default {
    load() {
        AppDispatcher.handleViewAction({
            actionType: ActionType.LOAD_PAGE
        });
        GithubAPI.getUser();
    }

}
