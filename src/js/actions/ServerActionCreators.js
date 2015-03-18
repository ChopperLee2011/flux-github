'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

export default {
    handleUserSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_USER_SUCCESS,
            response: response
        });
    },

    handleUserError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_USER_ERROR,
        });
    },
    handleRepoSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_REPO_SUCCESS,
            response: response
        });
    },

    handleRepoError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.GET_REPO_ERROR,
        });
    }

}
