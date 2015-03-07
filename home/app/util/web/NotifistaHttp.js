(function(){
    angular.module('notifista.services').service('NotifistaHttp', ['$http', service]);
    //var BASE_URL = 'http://localhost:1337';
    var BASE_URL = 'http://notifsta.com';
    //var BASE_URL = '';
    var credentials = {
        email: null,
        key: null 
    }

    function GetAuth(){
        return 'user_email=' + credentials.email + '&user_token=' + credentials.key;
    }

    function service($http){
        function LoginUser(email, password){
            return $http.post(BASE_URL + '/api/v1/auth/user', {
                    email: email,
                    password: password
                });
        }

        function GetUser(email){
            return $http.get(BASE_URL + '/api/v1/user?email=' + email);
        }

        function GetEvent(id) {
            console.log(GetAuth());
            return $http.get(BASE_URL + '/api/v1/events/'+ id + '/?' + GetAuth());
        }

        function Broadcast(broadcast, channel_ids){
            return channel_ids.map(function(channel_id){
                var req = {
                    url: BASE_URL + '/api/v1/channels/' + channel_id + '/messages',
                    method: 'POST',
                    params: {
                        'user_email': credentials.email,
                        'user_token': credentials.key,
                        'message[message_guts]' : broadcast
                    }
                }
                return $http(req);
            })
        }

        function LogoutUser(){
            return $http.get(BASE_URL + '/api/v1/auth/user/logout');
        }

        function Login(email, password){
            credentials.email = email;
            credentials.password = password
            var promise = $http.get(BASE_URL + '/api/v1/auth/login?email='+ email + '&password='+ password);
            promise.success(function(e){
                if (e.data){
                    credentials.key = e.data.authentication_token;
                }
            })
            return promise;
        }

        function GetParseData () {
            var req = {
                method: 'POST',
                url: 'https://api/v1.parse.com/1/events/AppOpened',
                headers: {
                    'X-Parse-Application-Id': 'zV50kkuGI8esJY0D6eAoy90bMgX3G2jWeTOTe1Rw',
                    'X-Parse-REST-API-Key': 'bJIyGfK5hvzCNudlBWFBUF1t7ZYbo9DTliXylG0z',
                    "Content-Type" : "application/json"
                },
                data: {},
            }
            return $http(req);
        }

        function LogoutEvent(){
            return $http.get('/api/v1/auth/event/logout');
        }

        function CreateEvent(name, password){
            return $http.post('/api/v1/event/', {
                name : name,
                password: password
            });
        }

        function CreateChannel(name){
            return $http.post('/api/v1/event/channel', {
                name : name
            });
        }

        function CreateNotification(event_name, channel_name, message){
            return $http.post('/api/v1/event/channel/notif')
        }

        function GetMessages(id){
            var req = {
                url: BASE_URL + '/api/v1/channels/' + id + '/messages',
                method: 'GET',
                params: {
                    'user_email': credentials.email,
                    'user_token': credentials.key
                }
            }
            return $http(req);
        }

        return {
            LoginUser: LoginUser,
            LogoutUser: LogoutUser,
            Login: Login,
            LogoutEvent: LogoutEvent,
            GetParseData: GetParseData,
            CreateEvent: CreateEvent,
            CreateChannel: CreateChannel,
            GetEvent: GetEvent,
            Broadcast: Broadcast,
            GetUser: GetUser,
            GetMessages: GetMessages,
            credentials: credentials
        }
    }

})();
