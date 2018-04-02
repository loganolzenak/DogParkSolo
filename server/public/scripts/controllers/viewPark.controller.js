myApp.controller('ViewParkController', ['ParksService','UserService', function( ParksService, UserService) {
    console.log('view park controller created');
    var self = this;

    
    self.UserService = UserService;
    self.UserService.getuser();
    // this updates the user info
   
    self.ParksService = ParksService;

    self.updatePark = ParksService.updatePark;
    
    self.Parks = ParksService.Parks;

    self.newPark = ParksService.newPark;

    self.addParks = ParksService.addParks;

    self.getParks = ParksService.getParks;
    
   
    self.deletePark = ParksService.deletePark;

    
    self.getParks();

 


}]);
