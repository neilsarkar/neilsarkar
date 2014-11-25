angular.module('neil').config([
  '$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'templates/hello.html',
        controller: 'HelloControl'
      }).
      when('/staging', {
        templateUrl: 'templates/staging.html',
        controller: 'HelloControl'
      }).
      otherwise({
        redirectTo: '/'
      })
  }
])
