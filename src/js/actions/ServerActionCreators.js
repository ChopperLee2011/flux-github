'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

export default {
    handleUserSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_USER_SUCCESS,
            response
        });
    },

    handleUserError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_USER_ERROR
        });
    },
    handleRepoSuccess(userName, response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_REPO_SUCCESS,
            userName,
            response
        });
    },

    handleRepoError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_REPO_ERROR
        });
    },
    handleIssueSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_ISSUE_SUCCESS,
            response
        });
    },

    handleIssueError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_ISSUE_ERROR
        });
    }

}
