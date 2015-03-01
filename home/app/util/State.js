(function(){
    angular.module('notifista.services').service('StateService',['$cookies', service]);
    function service($cookies){
        function GetUserLoggedIn(){
            return ($cookies['user-id'] != null);
        }
        function GetEventLoggedIn(){
            return ($cookies['event-name'] != null);
        }

        Event = null;
        User = null;

        return {
            GetUserLoggedIn: GetUserLoggedIn,
            GetEventLoggedIn: GetEventLoggedIn,
            Event: Event,
            User: User
        }
    }
})();
