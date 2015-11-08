angular.module('myApp', ['ionic', 'ngOpenFB', 'myApp.routes'])

  .run(function($ionicPlatform, ngFB) {
    // Initialize the APP ID for facebook Login
    ngFB.init({appId: 'YOUR_APP_ID'});

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('LoginCtrl',
              ['$scope', '$http', 'ngFB',
               function($scope, $http, ngFB) {

                 $scope.successLogin = false;

                 $scope.fbLogin = function () {
                   ngFB.login()
                     .then(
                       function (res) {
                         if (res.status === 'connected') {
                           console.log('Facebook login succeeded');
                           $scope.successLogin = true;
                         }
                         else {
                           alert('Facebook login failed');
                         }
                       }
                     );
                 };

               }])

;
