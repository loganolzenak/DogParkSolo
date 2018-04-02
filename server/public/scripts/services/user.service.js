myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  console.log('UserService Loaded');
  
  var self = this;

  self.userObject = {};
  


  self.getuser = function () {
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        // console.log('User Data: ', self.userObject.userName);
      } else {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    });
  }

  self.logout = function () {
    $http.get('/user/logout').then(function (response) {
      console.log('logged out');
      $location.path("/home");
    });
  }
}]);




