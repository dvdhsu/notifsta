/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 *
 */
(function(){
    angular.module('notifista.controllers').controller('UserPanelController',
    ['$scope', 'NotifistaHttp', 'UserService', '$cookies', '$timeout', function($scope, NotifistaHttp, UserService, $cookies, $timeout) {
        var TIMEOUT = 5 * 1000; //5 seconds
        var _websocket_enabled = false;

        $scope.logged_in = UserService.GetEventLoggedIn;

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

        $scope.SelectEvent = function(event){
            if ($scope.selected_event){
                $scope.selected_event.active = false;
            }
            event.active = true;
            $scope.selected_event = event;
            UserService.UpdateUserEvent($scope.selected_event);
        }

        function UpdateLoop(){
            UserService.SetUser($scope.email);
            if ($scope.selected_event){
                UserService.UpdateUserEvent($scope.selected_event);
            }
            setTimeout(UpdateLoop, TIMEOUT);
        }
        UpdateLoop();
        $scope.data = UserService.data;
    }]);
})();
