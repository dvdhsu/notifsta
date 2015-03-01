/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        event_name: {
            type: 'string',
            required: true
        },
        channel_name: {
            type: 'string',
            required: true
        },
        message: {
            type: 'string',
            required: true
        }
    }
};

