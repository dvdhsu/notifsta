/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 *
 */
(function(){
    angular.module('notifista.controllers').controller('UserPanelController',
    ['$scope', 'NotifistaHttp', 'StateService', '$cookies', '$timeout', function($scope, NotifistaHttp, StateService, $cookies, $timeout) {
        var TIMEOUT = 1 * 1000; //5 seconds
        var _websocket_enabled = false;

        $scope.logged_in = StateService.GetEventLoggedIn;

        // Need to make 'cmd' a child element of input. The issue is
        // documented here:
        // http://stackoverflow.com/questions/12618342/ng-model-does-not-update-controller-value
        $scope.input = {
            name: 'anthony_guo@live.com',
            password: 'asdfasdf'
        };

        $scope.email = 'lukas@me.com';

        $scope.tags = [];

        $scope.selected_event;

        $scope.refresh = function(){
            var promise = NotifistaHttp.GetUser($scope.email);
            promise.success(function(e){
                console.log(e.data);
                $scope.user_data = e.data;
                ProcessEvents(e.data.events);
            });

            promise.error(function(err){
                console.log(err);
            });
        }

        $scope.SelectEvent = function(event){
            if ($scope.selected_event){
                $scope.selected_event.active = false;
            }
            event.active = true;
            $scope.selected_event = event;
        }


        //Perform a simple diff calculation
        //... or maybe the server should do this ?
        function ProcessEvents(events){
            $scope.events = events.map(function(event){
                event.new_messages = 3;
                return event;
            });
            if ($scope.events.length > 0){ //auto select first event
                $scope.SelectEvent($scope.events[0]) 
            }
        }

        //Polls the server for more information
        function ProcessSelectedEvent(){
            if (_websocket_enabled){ //no need to poll
                return;
            }

            if ($scope.selected_event){
                $scope.selected_event.channels.map(function(channel){
                    console.log('wot');
                    var promise = NotifistaHttp.GetMessages($scope.selected_event.name, channel.name, $scope.email);
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
            setTimeout(ProcessSelectedEvent, TIMEOUT);
        }


        $scope.refresh();
        ProcessSelectedEvent();
    }]);
})();
