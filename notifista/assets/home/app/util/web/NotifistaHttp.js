(function(){
    angular.module('notifista.services').service('NotifistaHttp',['$http', service]);

    function service($http){
        function Login(email, password){
            console.log('OK')
            return $http.post('/api/auth', {
                    email: email,
                    password: password
                });
        }

        function Logout(){
            return $http.get('api/auth/logout');
        }

        return {
            Login: Login,
            Logout: Logout
        }
    }

})();
