/**
 * Created by chopper on 3/16/15.
 */
'use strict';

const Dispatcher = require('flux').Dispatcher,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('react/lib/Object.assign');

let AppDispatcher = assign(new Dispatcher(), {

    handleServerAction(action) {
        let payload = {
            source: ActionTypes.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },
    handleViewAction(action) {
        let payload = {
            source: ActionTypes.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});

module.export = AppDispatcher;