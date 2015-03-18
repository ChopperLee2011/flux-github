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
    }

}
