myApp.controller('NavController', ['UserService','$location', function(UserService, $location) {
    console.log('NavController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

   
    
  }]);