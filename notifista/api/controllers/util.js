var bcrypt = require('bcrypt');

var Parse = require('node-parse-api').Parse;

var APP_ID = 'zV50kkuGI8esJY0D6eAoy90bMgX3G2jWeTOTe1Rw';
var MASTER_KEY = 'LSjlnMISaVqKMKkRnQKmaZX0gWahZFSNCJUSF6Gq';


module.exports = {
    hash_password: function(password){
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    PushNotification: function(event_name, channel_names, message){
        console.log(channel_names);
        channel_names.map(function(channel_name){
            var notification = {
                channels: [channel_name],
                data: {
                    alert: message,
                    event: event_name,
                    channel: channel_name
                }
            };
            var app = new Parse(APP_ID, MASTER_KEY);

            app.sendPush(notification, function(err, resp){
                console.log(err);
                console.log(resp);
            });
        })
    }
}
