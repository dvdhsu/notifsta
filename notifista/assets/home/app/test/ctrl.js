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
    ['$scope', 'NotifistaHttp', 'StateService', '$cookies', function($scope, NotifistaHttp, StateService, $cookies) {

        $scope.screen = '';
        $scope.logged_in = StateService.GetUserLoggedIn;

        // Need to make 'cmd' a child element of input. The issue is
        // documented here:
        // http://stackoverflow.com/questions/12618342/ng-model-does-not-update-controller-value
        $scope.input = {
            name: 'anthony_guo@live.com',
            password: 'asdfasdf'
        };

        $scope.user_id = function(){
            return $cookies['user-id'];
        }
        console.log($cookies);

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
            p.success(function(e){
                console.log(e);
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

    }]);
})();
