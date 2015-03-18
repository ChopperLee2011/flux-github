'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionType = require('../constants/ActionTypes'),
    GithubAPI = require('../api/GithubAPI');

export default {
    getUser() {
        AppDispatcher.handleViewAction({
            actionType: ActionType.GET_USER
        });
        GithubAPI.getUserOrg();
    }

}
