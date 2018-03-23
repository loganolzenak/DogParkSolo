myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('LoginController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';

    self.login = function() {
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/authenticate', self.user).then(
        function(response) {
          if(response.status == 200) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user');
          } else {
            console.log('failure error: ', response);
            self.message = "The password was not correct.";
          }
        },
        function(response) {
          console.log('failure error: ', response);
          self.message = "The password was not correct.";
        });
      }
    };

    self.registerUser = function() {
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/register', self.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          self.message = "Please try again."
        });
      }
    }
}]);
