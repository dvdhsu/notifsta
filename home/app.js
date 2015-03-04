angular.module('notifista', [
    'notifista.controllers',
    'notifista.services',
    'ngTagsInput'
]);

angular.module('notifista.services', ['ngCookies']);

angular.module('notifista.controllers', ['ngCookies']);

angular.module('notifista').controller('MainController',
    ['$scope', 'NotifistaHttp', 'StateService', '$cookies', function($scope, NotifistaHttp, StateService, $cookies) {
        $scope.logged_in = StateService.GetEventLoggedIn;
        $scope.event = {
            name: 'Oxford Inspires'
        }
    }]);
