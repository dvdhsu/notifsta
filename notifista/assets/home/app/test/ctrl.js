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
    ['$scope', 'NotifistaHttp', '$cookies',function($scope, NotifistaHttp, $cookies) {

        $scope.screen = '';

        // Need to make 'cmd' a child element of input. The issue is
        // documented here:
        // http://stackoverflow.com/questions/12618342/ng-model-does-not-update-controller-value
        $scope.input = {
            email: 'anthony_guo@live.com',
            password: 'asdfasdf'
        };

        $scope.user_id = function(){
            return $cookies['user-id'];
        }
        console.log($cookies);

        $scope.submit = function(cmd){
            $scope.input.cmd = '';
        }

        $scope.login = function(){
            var p = NotifistaHttp.Login( $scope.input.email, $scope.input.password);
            console.log(p);
            p.success(function(e){
                console.log(e);
            })
            p.error(function(e){
                console.log(e);
            })
        }
        $scope.logout = function(){
            var p =NotifistaHttp.Logout();
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
