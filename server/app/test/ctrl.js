/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 *
 * A shell to interact with the bughouse internet chess server.
 *
 * The shell is only turned on if the "dev=true" flag is in
 * the URL.
 *
 */
(function(){
    angular.module('notifista.controllers').controller('Test',
    ['$scope', 'NotifistaHttp', function($scope, NotifistaHttp) {

        $scope.screen = '';

        // Need to make 'cmd' a child element of input. The issue is
        // documented here:
        // http://stackoverflow.com/questions/12618342/ng-model-does-not-update-controller-value
        $scope.input = {cmd: ''};

        $scope.submit = function(cmd){
            $scope.input.cmd = '';
        }

        $scope.login = function(){
            var p = NotifistaHttp.Login('anthony_guo@live.com', 'asdfasdf');
            console.log(p);
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

    }]);
})();
