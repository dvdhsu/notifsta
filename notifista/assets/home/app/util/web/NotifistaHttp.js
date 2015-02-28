(function(){
    angular.module('notifista.services').service('NotifistaHttp', ['$http', service]);

    function service($http){
        function LoginUser(email, password){
            console.log('OK')
            return $http.post('/api/auth/user', {
                    email: email,
                    password: password
                });
        }

        function LogoutUser(){
            return $http.get('api/auth/user/logout');
        }

        function LoginEvent(eventName, password){
            console.log('OK')
            return $http.post('/api/auth/event', {
                    eventName: eventName,
                    password: password
                });
        }

        function LogoutEvent(){
            return $http.get('api/auth/event/logout');
        }

        return {
            LoginUser: LoginUser,
            LogoutUser: LogoutUser,
            LoginEvent: LoginEvent,
            LogoutEvent: LogoutEvent
        }
    }

})();
