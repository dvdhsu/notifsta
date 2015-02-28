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

        var config2 = {headers: {
            'X-Parse-Application-Id': 'zV50kkuGI8esJY0D6eAoy90bMgX3G2jWeTOTe1Rw',
            'X-Parse-REST-API-Key': 'bJIyGfK5hvzCNudlBWFBUF1t7ZYbo9DTliXylG0z',
            "Content-Type" : "application/json"
            }
        };  

        function GetParseData () {
            var req = {
 method: 'POST',
 url: 'https://api.parse.com/1/events/AppOpened',
    headers: {
        'X-Parse-Application-Id': 'zV50kkuGI8esJY0D6eAoy90bMgX3G2jWeTOTe1Rw',
            'X-Parse-REST-API-Key': 'bJIyGfK5hvzCNudlBWFBUF1t7ZYbo9DTliXylG0z',
            "Content-Type" : "application/json"
                },
                data: {},
            }
            console.log(req);
            return $http(req);
              
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
            GetParseData: GetParseData
            CreateEvent: CreateEvent,
            CreateChannel: CreateChannel
        }
    }

})();
