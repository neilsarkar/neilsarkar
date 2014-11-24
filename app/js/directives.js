angular.module('neil').directive('autoheight', [
  function() {
    return {
      restrict: 'A',
      link: function() {
        console.log("hiye")
      }
    }
  }
])
