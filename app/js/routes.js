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
      when('/scratch', {
        templateUrl: 'templates/scratch.html',
        controller: 'HelloControl'
      }).
      when('/todo', {
        templateUrl: 'templates/todo.html',
        controller: 'HelloControl'
      }).
      otherwise({
        redirectTo: '/'
      })
  }
])
