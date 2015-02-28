/** Anthony Guo (anthony.guo@some.ox.ac.uk)
 *
 */
(function(){
    angular.module('notifista.controllers').controller('Test',
    ['$scope', 'NotifistaHttp', 'StateService', '$cookies', function($scope, NotifistaHttp, StateService, $cookies) {

        $scope.screen = '';
        $scope.logged_in = StateService.GetUserLoggedIn;

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
            var p = NotifistaHttp.LoginUser( $scope.input.email, $scope.input.password);
            console.log(p);
            p.success(function(user){
                console.log(user);
                StateService.User = user;
            })
            p.error(function(e){
                console.log(e);
            })
        }
        $scope.logout = function(){
            var p =NotifistaHttp.LogoutUser();
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
