/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 *
 */
(function(){
    angular.module('notifista.controllers').controller('AdminPanelController',
    ['$scope', 'NotifistaHttp', 'StateService', '$cookies', '$timeout', function($scope, NotifistaHttp, StateService, $cookies, $timeout) {

        $scope.logged_in = StateService.GetEventLoggedIn;

        // Need to make 'cmd' a child element of input. The issue is
        // documented here:
        // http://stackoverflow.com/questions/12618342/ng-model-does-not-update-controller-value
        $scope.input = {
            name: 'anthony_guo@live.com',
            password: 'asdfasdf'
        };

        $scope.tags = [];

        $scope.loadTags = function(eventname) {
            var p = NotifistaHttp.LoadTags(eventname);
            p.success(function(e){
                $scope.loadedtags = [];
                console.log(e);
                var n = e.data.channels.length;
                for(var i=0; i<n; i++){
                    $scope.loadedtags.push({'text': e.data.channels[i].name});
                }
                console.log($scope.loadedtags);
                return $scope.loadedtags;
                
            })
            p.error(function(e){
                console.log(e);
            })
        };

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

        $scope.nextstep = function(){
            $scope.step2 = true;
        }

        $scope.finalstep = function(){
            var eventname = $scope.event_name();
            var broadcast = $scope.input.broadcast;
            var list = $scope.tags.map(function(o){
                return o.text;
            })
            var p =NotifistaHttp.Broadcast(eventname, broadcast, list);
            p.success(function(e){
                console.log(e);
                $timeout(function() {
                    console.log($scope.input);
                    $scope.step2 = false;
                    console.log($scope.input.broadcast);
                    $scope.input.broadcast = '';
                });
                
            })
            p.error(function(e){
                console.log(e);
            })
        }
        
        $scope.GetEvent = function(event_name){
            var p = NotifistaHttp.GetEvent(event_name);
            p.success(function(e){
                console.log(e);
                $scope.event = e.data;
            })
            p.error(function(e){
                console.log(e);
            })
        }

        $scope.submit = function(cmd){
            $scope.input.cmd = '';
        }

        var promise = NotifistaHttp.GetParseData();
        promise.success(function(data){
            
            console.log(data);

        });
        promise.error(function(err){
            //error is in err
            console.log('ERROR');
            console.log(err);
        })

        $scope.login = function(){
            var p = NotifistaHttp.LoginEvent( $scope.input.name, $scope.input.password);
            console.log(p);
            p.success(function(event){
                console.log(event);
                StateService.Event = event;
            })
            p.error(function(e){
                console.log(e);
            })
        }
        $scope.logout = function(){
            var p =NotifistaHttp.LogoutEvent();
            p.success(function(e){
                console.log(e);
            })
            p.error(function(e){
                console.log(e);
            })

        }


        function MsgArrived(response) {
            $scope.screen += response.data;
        }

        $scope.GetEvent($scope.event_name());

    }]);
})();
