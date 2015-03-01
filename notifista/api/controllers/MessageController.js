/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('./util');
function GetMessages(req, res){
    console.log(req.session);
    console.log(req.cookies);
    var params = req.params.all();

    var event_name = params['event-name'];
    var channel_name = params['channel-name'];
    var last_time = params['last-time'];

    var query = {
        where : {
            event_name: event_name,
            channel_name: channel_name,
            sort: 'createdAt DESC',
        }
    }
    if (last_time){
        query.where.createdAt = { '>' : new Date(last_time) }
    }
    console.log(query);
    Message.find(query).exec(function(err, data){
        console.log(err);
        console.log(data);
        res.json(data);
    })
}

function SendMessage(req, res){
    console.log(req.session);
    console.log(req.cookies);
    var params = req.params.all();

    var event_name = req.cookies['event-name'];
    var channel_name = params['channel-name'];
    var message = params.message;

    if (!event_name){
        res.json({error: 'Not logged into event!'});
        return;
    }

    var new_message = {
        message: message,
        event_name: event_name,
        channel_name: channel_name
    };
    Message.create(new_message).exec(HandleMessageCreate);
    function HandleMessageCreate(err, created){
        if (err){
            res.json({
                status: 'Error',
                data: err
            });
        } else {
            res.json({
                status: 'Success',
                data: created
            });
            util.DesktopPushNotification(created);
            util.PushNotification(created);
        }
    }
}

module.exports = {
    SendMessage: SendMessage,
    GetMessages: GetMessages
	
};

