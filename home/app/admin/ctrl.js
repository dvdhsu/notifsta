/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 *
 */
(function(){
    angular.module('notifista.controllers').controller('AdminPanelController',
    ['$scope', 'NotifistaHttp', 'EventService', '$cookies', '$timeout', function($scope, NotifistaHttp, EventService, $cookies, $timeout) {
        //TESTING PURPOSES ONLY
        //var p = NotifistaHttp.LoginEvent('event1', 'asdfasdf');
        var p = NotifistaHttp.LoginEvent('HackLondon', 'asdfasdf');
        p.success(function(e){
            console.log(e);
            console.log($cookies['event-name']);
        })
        p.error(function(e){
            console.log(e);
        })
        // OK
        var TIMEOUT = 1 * 1000;

        $scope.input = {
            broadcast: ''
        }
        $scope.step2 = false;

        $scope.user_id = function(){
            return $cookies['user-id'];
        }

        $scope.event_name = function(){
            return $cookies['event-name'];
        }

        $scope.broadcast_notice = function(){
            var eventname = $scope.data.Event.name;
            var message = $scope.input.message;
            var channel_names = $scope.data.Event.channels
                .filter(function(channel){
                    return channel.selected;
                })
                .map(function(channel){
                    return channel.name;
                })
            var p = NotifistaHttp.Broadcast(eventname, message, channel_names);
            $scope.loading = true;
            $scope.info = 'Sending...';
            p.success(function(e){
                console.log(e);
                $timeout(function() {
                    $scope.input.message = '';
                });
                $scope.loading = false;
                if (e.error){
                    $scope.info = e.error;
                } else {
                    $scope.info = 'Success!';
                }
                ClearInfoTimeout();
            })
            p.error(function(e){
                $scope.loading = false;
            })
        }

        function ClearInfoTimeout(){
            setTimeout(function(){
                $scope.info = '';
            }, 3000);
        }


        $scope.selected_none = function(){
            return $scope.data.Event.channels.filter(function(e){return e.selected}).length  ==  0;
        }

        var promise = NotifistaHttp.GetParseData();
        promise.success(function(data){
        });
        promise.error(function(err){
            //error is in err
            console.log('ERROR');
            console.log(err);
        })

        function UpdateLoop(){
            EventService.UpdateEvent();
            setTimeout(UpdateLoop, TIMEOUT);
        }


        EventService.SetEvent($scope.event.name);
        UpdateLoop();
        $scope.data = EventService.data;

    }]);
})();
