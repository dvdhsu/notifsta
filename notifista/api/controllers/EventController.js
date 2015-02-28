/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


function CreateEvent(req, res){
    console.log('CreateEvent called');
    var params = req.params.all();

    var new_event = {
        name: params.username,
        password_hash: util.hash_password(params.password),
        channels: [],
    };

    Event.findOne({name: params.name})
        .exec(function (err, user){
            console.log(user);
            if (user != null){
                res.json({
                    status: 'Error',
                });
            } else {
                Event.create(new_user)
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
    Event.findOne({name: params.name})
        .exec(function (err, event){
            if (err || event == null){
                res.json({
                    status: 'Error',
                    data: err
                });
            } else {
                res.json({
                    status: 'Success',
                    data: user
                });
            }
        })
}
module.exports = {
    CreateEvent: CreateEvent,
    GetEvent: GetEvent
	
};

