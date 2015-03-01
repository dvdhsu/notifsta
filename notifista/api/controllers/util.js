var bcrypt = require('bcrypt');
var roost = require('roost-web-push');

var Parse = require('node-parse-api').Parse;

var APP_ID = 'zV50kkuGI8esJY0D6eAoy90bMgX3G2jWeTOTe1Rw';
var MASTER_KEY = 'LSjlnMISaVqKMKkRnQKmaZX0gWahZFSNCJUSF6Gq';


module.exports = {
    hash_password: function(password){
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    DesktopPushNotification: function(obj) {
      var key = "663fcc9f45c446778e3eb656511e044b";
      var secret = "9d82b10223434b049f4d7a8d673df62b";
      var params = {};
      params.msg = obj.message;
      params.url = "http://notifsta.com/updates.html";
      roost.sendNote(key, secret, params, function(data) {});
    },
    PushNotification: function(obj){
        var notification = {
            channels: [obj.channel_name],
            data: {
                alert: obj.message,
                event: obj.event_name,
                channel: obj.channel_name
            }
        };
        var app = new Parse(APP_ID, MASTER_KEY);

        app.sendPush(notification, function(err, resp){
            console.log(err);
            console.log(resp);
        });
    }
}
