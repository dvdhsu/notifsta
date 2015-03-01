angular.module('notifista', [
    'notifista.controllers',
    'notifista.services'
]);

angular.module('notifista.services', ['ngCookies']);

angular.module('notifista.controllers', ['ngCookies']);

angular.module('notifista').controller('MainController',
    ['$scope', 'NotifistaHttp', 'StateService', '$cookies', function($scope, NotifistaHttp, StateService, $cookies) {
        $scope.logged_in = StateService.GetEventLoggedIn;
    }]);