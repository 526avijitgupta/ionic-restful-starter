angular.module('myApp.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('Login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });
