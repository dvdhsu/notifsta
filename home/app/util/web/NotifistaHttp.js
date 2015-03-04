(function(){
    angular.module('notifista.services').service('NotifistaHttp', ['$http', service]);
    var BASE_URL = 'http://localhost:1337';

    function service($http){
        function LoginUser(email, password){
            return $http.post(BASE_URL + '/api/auth/user', {
                    email: email,
                    password: password
                });
        }

        function GetUser(email){
            return $http.get(BASE_URL + '/api/user?email=' + email);
        }

        function GetEvent(name) {
            console.log(name);
            return $http.get(BASE_URL + 'api/event?name='+name);
        }

        function Broadcast(eventname, broadcast, channels){
            return $http.post(BASE_URL + '/api/message', {
                    'event-name': eventname,
                    'message': broadcast,
                    'channel-name': channels
                });
        }

        function LogoutUser(){
            return $http.get(BASE_URL + '/api/auth/user/logout');
        }

        function LoginEvent(name, password){
            return $http.post(BASE_URL + '/api/auth/event', {
                    name: name,
                    password: password
                });
        }

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
            return $http.get('/api/auth/event/logout');
        }

        function CreateEvent(name, password){
            return $http.post('/api/event/', {
                name : name,
                password: password
            });
        }

        function CreateChannel(name){
            return $http.post('/api/event/channel', {
                name : name
            });
        }

        function CreateNotification(event_name, channel_name, message){
            return $http.post('/api/event/channel/notif')
        }

        function GetMessages(event_name, channel_name, email){
            var req = {
                url: BASE_URL + '/api/message',
                method: 'GET',
                params: {
                    'event-name' : event_name,
                    'channel-name': channel_name,
                    'email' : email
                }
            }
            return $http(req);
        }

        return {
            LoginUser: LoginUser,
            LogoutUser: LogoutUser,
            LoginEvent: LoginEvent,
            LogoutEvent: LogoutEvent,
            GetParseData: GetParseData,
            CreateEvent: CreateEvent,
            CreateChannel: CreateChannel,
            GetEvent: GetEvent,
            Broadcast: Broadcast,
            GetUser: GetUser,
            GetMessages: GetMessages
        }
    }

})();
