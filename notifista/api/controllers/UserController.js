/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('./util.js')

function Login(req, res){
    var bcrypt = require('bcrypt');
    var params = req.params.all();
    console.log(req.session);

    User.findOne({email: params.email}).exec(function (err, user) {
        if (err) res.json({ error: 'DB error' }, 500);

        if (user) {
            bcrypt.compare(req.body.password, user.password_hash, function (err, match) {
                if (err) res.json({ error: 'Server error' }, 500);

                if (match) {
                    // password match
                    res.cookie('user-id', user.id.toString());
                    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
                    res.send('SUccess!');
                } else {
                    // invalid password
                    if (req.session.user) res.cookie = ('user-id', null);
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
        channels: ['all'] //we need a non empty array fr some stupid reason
    }
    User.findOne({email: params.email})
        .exec(function (err, user){
            if (err || user == null){
                User.create(new_user)
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

    Login: Login,
    Logout: Logout



};

