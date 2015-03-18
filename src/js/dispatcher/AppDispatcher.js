'use strict';

const { Dispatcher } = require('flux'),
    PayloadSources = require('../constants/PayloadSources'),
    assign = require('react/lib/Object.assign');
let AppDispatcher = assign(new Dispatcher(), {

    handleServerAction(action) {
        console.log('server action', action);

        let payload = {
            source: PayloadSources.SERVER_ACTION,
            action
        };
        this.dispatch(payload);
    },
    handleViewAction(action) {
        console.log('view action', action);

        let payload = {
            source: PayloadSources.VIEW_ACTION,
            action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;