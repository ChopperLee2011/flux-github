'use strict';

const assign = require('react/lib/Object.assign'),
    {EventEmitter} = require('events'),
    CHANGE_EVENT = 'change';
export function createStore(spec) {
    let store = assign({}, EventEmitter.prototype, spec, {
        emitChange() {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener(callback) {
            this.on(CHANGE_EVENT, callback);
        },

        removeChangeListener(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }
    });
    return store;
}