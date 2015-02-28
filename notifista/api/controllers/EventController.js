/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('./util');

function CreateChannel(req, res){
    var event_id = 23;
}

function Login(req, res){
    var bcrypt = require('bcrypt');
    var params = req.params.all();
    console.log(req.session);

    User.findOne({name: params.name}).exec(function (err, event) {
        if (err) res.json({ error: 'DB error' }, 500);

        if (event) {
            bcrypt.compare(req.body.password, event.password_hash, function (err, match) {
                if (err) res.json({ error: 'Server error' }, 500);

                if (match) {
                    // password match
                    res.cookie('event-id', event.id.toString());
                    res.send('Success!');
                } else {
                    // invalid password
                    if (req.session.event) res.clearCookie('event-id');
                    res.json({ error: 'Invalid password' }, 400);
                    //res.send(req.session);
                }
            });
        } else {
            res.json({ error: 'User not found' }, 404);
        }
    });
}

function Logout(req, res){
    res.clearCookie('event-id');
    res.send('Success!');
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
};

