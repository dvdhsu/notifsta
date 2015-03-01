/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('./util.js')

function AddEventChannel(req, res){
    console.log(req.session);
    console.log(req.cookies);
    var user_id = req.cookies['user-id'];
    var params = req.params.all();
    if (!user_id){
        res.json({error: 'Not logged in as a user!'});
        return;
    }
    var params = req.params.all();
    console.log(req.session);
    var event_name = params['event-name'];
    var channel_name = params['channel-name'];

    console.log(channel_name);
    function HandleFindUser(err, user){
        console.log(user);
        if (err) res.json({ status: 'Error', error: 'DB error' }, 500);
        if (user) {
            if (!user.events){
                user.events = [];
            }
            var has_event = false;
            var has_channel = false;
            for (var i = 0; i != user.events.length; ++i){
                if (user.events[i].name == event_name){
                    has_event = true;
                    var channels = user.events[i].channels;
                    for (var j = 0; j != channels.length; ++j){
                        if (channels[j].name == channel_name){
                            has_channel = true;
                            res.json({
                                status: 'Error',
                                data: 'Already subscribed to event'
                            });
                            return;
                        }
                    }
                }
            }
            if (!has_event){
                user.events.push({
                    name: event_name,
                    channels: []
                })
            }
            if (!has_channel){
                for (var i = 0; i != user.events.length; ++i){
                    if (user.events[i].name == event_name){
                        user.events[i].channels.push({name: channel_name});
                    }
                }
            }
            console.log(user);
            user.save(function(error){
                if (error){
                    res.json({status: 'Error occurred when trying to save the event'});
                } else {
                    res.json({status: 'Success', data: user});
                }
            });

        } else {
            res.json({ status: 'Error', error: 'User not found' }, 404);
        }
    }

    User.findOne({id: user_id}).exec(HandleFindUser);

}

function Login(req, res) {
    var bcrypt = require('bcrypt');
    var params = req.params.all();
    console.log(req.session);

    User.findOne({email: params.email}).exec(function (err, user) {
        if (err) res.json({ status: 'Error', error: 'DB error' }, 500);

        if (user) {
            bcrypt.compare(req.body.password, user.password_hash, function (err, match) {
                if (err) res.json({status: 'Error', error: 'Server error' }, 500);

                if (match) {
                    // password match
                    res.cookie('user-id', user.id.toString(),{httpOnly: true, expires: new Date(Date.now() + 10*60*1000)}); //login!
                    delete(user.password_hash); //Do not send hash of password
                    res.json({
                        status: 'Success',
                        data: user
                    });
                } else {
                    // invalid password
                    if (req.session.user) res.clearCookie('user-id');
                    res.json({ status: 'Error', error: 'Invalid password' }, 400);
                    //res.send(req.session);
                }
            });
        } else {
            res.json({ status: 'Error', error: 'User not found' }, 404);
        }
    });
}

function Logout(req, res){
    res.clearCookie('user-id');
    res.send('Success!');
}

function CreateUser(req, res){
    var params = req.params.all();
    console.log('CreateUser called');
    console.log(params);

    var new_user = {
        email: params.email,
        password_hash: util.hash_password(params.password),
        events: [] //we need a non empty array fr some stupid reason
    }
    User.findOne({email: params.email})
        .exec(function (err, user){
            if (err || user == null){
                User.create(new_user).exec(function (err, created){
                if (err){
                    res.json({
                        status: 'Error',
                        data: err
                    });
                } else {
                    res.cookie('user-id', created.id.toString(),{httpOnly: true, expires: new Date(Date.now() + 10*60*1000)}); //login!
                    delete(created.password_hash); //Do not send hash of password
                    res.json({
                        status: 'Success',
                        data: created
                    });
                }
            });
            } else {
                res.json({
                    status: 'Error',
                });
            }
        });
}

function GetUser(req, res){
    var params = req.params.all();
    console.log('GetUser called');
    console.log(params);
    if (!params.expand) {
        User.findOne({email: params.email})
            .exec(function (err, user){
                if (err || user == null){
                    res.json({
                        status: 'Error',
                    });
                } else {
                    delete(user.password_hash); //Do not send hash of password
                    res.json({
                        status: 'Success',
                        data: user
                    });
                }
            })
    } else {
        User.findOne({email: params.email})
            .exec(function (err, user){
                if (err){
                    res.json({
                        status: 'Error',
                        data: err
                    });
                } else {
                    // Get more information
                }
            });
    }
}

module.exports = {
    // GET
    // Args:
    //  Email: string
    // Result:
    //  {
    //      status: 'Error' | 'Success',
    //      email: string,
    //      first_name: string,
    //      last_name: string,
    //      channels: []
    //  }
    GetUser: GetUser,

    // POST
    // Args: 
    //  Email: string
    // Result:
    //  {
    //      status: 'Error' | 'Success'
    //      message: { ... }
    //  }
    CreateUser: CreateUser,

    AddEventChannel: AddEventChannel,

    Login: Login,
    Logout: Logout
};
