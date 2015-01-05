angular.module('neil').controller('HelloControl', [
  function() {
    if( !(window.screen && window.screen.width < 768) ) {
      skrollr.init({forceHeight: false})
    }
  }
])
