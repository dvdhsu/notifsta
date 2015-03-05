/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 * Purpose of this service is to maintain the global state of the event application.
 * Provides methods for updating
 */

(function(){
    angular.module('notifista.services').service('EventService', ['$cookies', 'NotifistaHttp', service]);
    function service($cookies, NotifistaHttp){
        function GetEventLoggedIn(){
            return ($cookies['event-name'] != null);
        }

        //We wrap everything under a _data object so that we can perform databindings much more easily!
        //Otherwise, we will be assigning by value and things get messy quite quickly!
        var _data = {
            Event: {
                channels: []
            },
        }
        var _websocket_enabled = false;
        


        function SetEvent(event_name){
            var promise = NotifistaHttp.GetEvent(event_name);
            promise.success(function(resp){
                _data.Event = resp.data;
            });
            
            promise.error(function(err){
            })

        }

        function UpdateEvent(){
            var event = _data.Event;
            if (_websocket_enabled){ //no need to poll
                return;
            }

            if (!event){
                return;
            }
            event.channels.map(function(channel){
                var promise = NotifistaHttp.GetMessages(event.name, channel.name);
                promise.success(function(messages){
                    channel.messages = messages.map(function(msg){
                        msg.time = moment(msg.createdAt).fromNow();
                        return msg;
                    });
                });
                promise.error(function(error){
                    channel.messages = [
                    {
                        time: 'N/A',
                        message: 'Error in getting data'
                    }
                    ]
                })
            });

        }


        return {
            //Used to set the event we would like to have info about
            SetEvent: SetEvent,

            //Used to get updated information about the event
            UpdateEvent: UpdateEvent,

            //for data binding purposes
            data : _data
        }
    }
})();

