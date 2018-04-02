myApp.controller('AddParkController', ['ParksService', 'UserService', function(ParksService, UserService) {
    console.log('add park controller created');
    var self = this;

    self.UserService = UserService;
    self.userObject = UserService.userObject;
    self.getuser = UserService.getuser;
    
    self.getuser();

    ParksService.added_by = self.userObject.username;
    

    console.log( self.userObject );
    

    self.ParksService = ParksService;
    
    self.newPark = ParksService.newPark;
    console.log('self.newPark controller', self.newPark );
    
    self.popUp = ParksService.popUp;
    self.updatePark = ParksService.updatePark;


    self.getParks = ParksService.getParks;

    self.addParks = ParksService.addParks;

    self.Parks = ParksService.Parks;
}]);




