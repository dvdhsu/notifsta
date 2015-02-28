(function(){
    angular.module('notifista.services').service('StateService',['$cookies', service]);
    function service($cookies){
        console.log('done');
        function GetUserLoggedIn(){
            console.log('ok');
            return ($cookies['user-id'] != null);
        }
        function GetEventLoggedIn(){
            return ($cookies['event-id'] != null);
        }

        return {
            GetUserLoggedIn: GetUserLoggedIn,
            GetEventLoggedIn: GetEventLoggedIn
        }
    }
})();
