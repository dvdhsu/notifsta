/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('./util');

function SendToClient(req, res, data){
    var email = req.params.all().email;
    msgs = data.map(function(msg){
        if (email && msg.type == 'question' && msg.responses){
            for (var i = 0; i != msg.responses.length; ++i){
                if (msg.responses[i].email == email){
                    msg.response = msg.responses[i];
                    break;
                }
            }
            delete(msg.responses);
        }
        return msg;
    });
    res.json(msgs);
}

function HandleResponse(req, res){
    var params = req.params.all();

    var message_id = params.id;
    var email = params.email;
    var answer = JSON.parse(params.answer);

    Message.findOne({id: message_id}).exec(function(err, message){
            if (err || message == null){
            } else {
            }
    });
}


function GetMessages(req, res){
    console.log(req.session);
    console.log(req.cookies);
    var params = req.params.all();

    var event_name = params['event-name'];
    var channel_name = params['channel-name'];
    var last_time = params['last-time'];
    var email = params.email;

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
        SendToClient(req, res, data);
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
    var answers = params.answers;

    if (!event_name){
        res.json({error: 'Not logged into event!'});
        return;
    }
    var new_message = {
        message: message,
        event_name: event_name,
        channel_name: channel_name,
    };
    if (!answers){
        new_message.type = 'question';
        new_message.answers = answers;
    } else {
        new_message.type = 'message';
    }

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
    	    Message.publishCreate(created);
        }
    }
}

module.exports = {
    SendMessage: SendMessage,
    GetMessages: GetMessages
	
};

