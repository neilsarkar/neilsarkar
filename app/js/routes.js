angular.module('neil').config([
  '$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'templates/hello.html',
        controller: 'HelloControl'
      }).
      when('/test', {
        templateUrl: 'templates/test.html'
      }).
      otherwise({
        redirectTo: '/'
      })
  }
])
