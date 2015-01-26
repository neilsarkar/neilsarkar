angular.module('neil').config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/hello.html',
        controller: 'HelloControl'
      }).
      when('/chart', {
        templateUrl: 'templates/chart.html',
        controller: 'ChartControl'
      }).
      otherwise({
        redirectTo: '/'
      })
  }
])
