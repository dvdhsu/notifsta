/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    password_hash: {
        type: 'string',
        required: true
    },
    email: {
        type: 'email',
        unique: true,
        required: true
    },
    events: {
        type: 'array', // Array of channel ids
    }
  }
};

