/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('./util');

function GetNumberOfSubscribers(req, res){
    console.log(req.session);
    console.log(req.cookies);
    var event_name = req.cookies['event-name'];
    var params = req.params.all();

    var query = {
        where : {
            event_name: event_name,
        }
    }
    if (last_time){
        query.where.createdAt = { '>' : new Date(last_time) }
    }
    console.log(query);
    User.find(query).exec(function(err, data){
        console.log(err);
        console.log(data);
        res.json(data);
    })
}

function GetInviteLink(req, res){
    console.log(req.session);
    console.log(req.cookies);
    var event_name = req.cookies['event-name'];
    var params = req.params.all();

    if (!event_name){
        res.json({error: 'Not logged into event!'});
        return;
    }
    function HandleFindEvent(err, event){
        if (err) res.json({ error: 'DB error' }, 500);
        if (event) {
            if (!event.channels){
                event.channels = [];
            }
            for(var i = 0; i != event.channels.length; ++i){
                if (event.channels[i].name == params.name){
                    res.json({
                        status: 'Success',
                        data: {
                            url: GLOBAL.DOMAIN_NAME + '/invite/?event-name=' + event_name + '&channel_name=' + params.name + '&email=' + params.email
                        }
                    })
                    return;
                }
            }
            res.json({status:'Error', error: 'No channel with that name exists!'});
        } else {
            res.json({ error: 'Event not found' }, 404);
        }

    }
    var promise = Event.findOne({name: event_name});
    promise.exec(HandleFindEvent);
}

function CreateChannel(req, res){
    var event_name = req.cookies['event-name'];
    var params = req.params.all();
    if (!event_name){
        res.json({error: 'Not logged into event!'});
        return;
    }
    Event.findOne({name: event_name}).exec(HandleFindEvent);
    function HandleFindEvent(err, event){
        console.log('FOUND EVENT');
        console.log(event);
        console.log(err);
        if (err) res.json({ error: 'DB error' }, 500);
        if (event) {
            if (!event.channels){
                event.channels = [];
            }
            for(var i = 0; i != event.channels.length; ++i){
                console.log('sdf');
                console.log(event.channels[i]);
                if (event.channels[i].name == params.name){
                    res.json({error: 'Channel with that name already exists!'});
                    return;
                }
            }
            console.log('sdf');
            event.channels.push({
                name: params.name,
                //OTHER STUFF FOR PARSE
            });
            event.save(function(error){
                if (error){
                    res.json({status: 'Error occurred when trying to save the event'});
                } else {
                    res.json({status: 'Success'});
                }
            });
        } else {
            res.json({ error: 'Event not found' }, 404);
        }

    }

}

function Login(req, res){
    var bcrypt = require('bcrypt');
    var params = req.params.all();
    console.log(req.session);
    console.log(params);

    Event.findOne({name: params.name}).exec(function (err, event) {
        if (err) res.json({ status: 'Error', error: 'DB error' }, 500);

        if (event) {
            bcrypt.compare(req.body.password, event.password_hash, function (err, match) {
                if (err) res.json({ status: 'Error', error: 'Server error' }, 500);

                if (match) {
                    // password match
                    res.cookie('event-name', event.name.toString(),{httpOnly: true, expires: new Date(Date.now() + 10*60*1000)}); //login!);
                    delete(event.password_hash); //Do not send hash of password
                    res.json({
                        status: 'Success',
                        data: event
                    });
                } else {
                    // invalid password
                    if (req.session.event) res.clearCookie('event-name');
                    res.json({ status: 'Error', error: 'Invalid password' }, 400);
                }
            });
        } else {
            res.json({ status: 'Error', error: 'Event not found' }, 404);
        }
    });
}

function Logout(req, res){
    res.clearCookie('event-name');
    res.json({status: 'Success'});
}

function CreateEvent(req, res){
    console.log('CreateEvent called');
    var params = req.params.all();

    var new_event = {
        name: params.name,
        password_hash: util.hash_password(params.password),
        channels: [],
    };

    Event.findOne({name: params.name})
        .exec(function (err, event){
            console.log(event);
            if (event != null){
                res.json({
                    status: 'Error',
                });
            } else {
                Event.create(new_event)
                    .exec(function (err, created){
                        if (err){
                            res.json({
                                status: 'Error',
                                data: err
                            });
                        } else {
                            res.cookie('event-name', created.name.toString(), {httpOnly: true, expires: new Date(Date.now() + 10*60*1000)}); //login!)
                            delete(created.password_hash); //Do not send hash of password
                            res.json({
                                status: 'Success',
                                data: created
                            });
                        }
                    });
            }
    });
}

function GetEvent(req, res){
    if (GLOBAL._DEBUG){
        console.log('GetEvent called');
    }
    var params = req.params.all();
    var query = { };
    if (params.name){
        query.name = params.name;
    } else if (params.id){
        query.id = params.id;
    } else {
        res.json({
            status: 'Error',
            data: 'No event specified'
        })
    }
    Event.findOne(query)
        .exec(function (err, event){
            if (err || event == null){
                res.json({
                    status: 'Error',
                    data: err
                });
            } else {
                res.json({
                    status: 'Success',
                    data: event
                });
            }
        })
}


module.exports = {
    CreateEvent: CreateEvent,
    GetEvent: GetEvent,
    CreateChannel: CreateChannel,
    GetInviteLink: GetInviteLink,
    Login: Login,
    Logout: Logout
};
