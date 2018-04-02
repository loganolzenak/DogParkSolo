var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider','$mdThemingProvider', function ($routeProvider, $locationProvider , $mdThemingProvider) {


  $mdThemingProvider.theme('default')
  .primaryPalette('grey')
  .accentPalette('red');



  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/addPark', {
      templateUrl: 'views/templates/addParks.html',
      controller: 'AddParkController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/viewPark', {
      templateUrl: 'views/templates/viewParks.html',
      controller: 'ViewParkController as vm',
    })
    .otherwise({
      template: '<h1>404</h1>'
    });






}]);
