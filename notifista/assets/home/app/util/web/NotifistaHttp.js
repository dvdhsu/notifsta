(function(){
    angular.module('notifista.services').service('NotifistaHttp', ['$http', service]);

    function service($http){
        function LoginUser(email, password){
            return $http.post('/api/auth/user', {
                    email: email,
                    password: password
                });
        }

        function LogoutUser(){
            return $http.get('api/auth/user/logout');
        }

        function LoginEvent(name, password){
            return $http.post('/api/auth/event', {
                    name: name,
                    password: password
                });
        }

        function LogoutEvent(){
            return $http.get('api/auth/event/logout');
        }

        function CreateEvent(name, password){
            return $http.post('api/event/', {
                name : name,
                password: password
            });
        }

        function CreateChannel(name){
            return $http.post('api/event/channel', {
                name : name
            });
        }

        function CreateNotification(event_name, channel_name, message){
            return $http.post('api/event/channel/notif')
        }

        return {
            LoginUser: LoginUser,
            LogoutUser: LogoutUser,
            LoginEvent: LoginEvent,
            LogoutEvent: LogoutEvent,
            CreateEvent: CreateEvent,
            CreateChannel: CreateChannel
        }
    }

})();
