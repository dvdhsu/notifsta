(function(){
    angular.module('notifista.services').service('NotifistaHttp',['$http', service]);

    function service($http){
        function Login(email, password){
            console.log('OK')
            return $http.post('http://localhost:1337/auth', {
                    email: email,
                    password: password
                });
        }

        return {
            Login: Login
        }
    }

})();
