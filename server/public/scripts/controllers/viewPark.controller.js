myApp.controller('ViewParkController', ['ParksService', function( ParksService) {
    console.log('view park controller created');
    var self = this;


    self.ParksService = ParksService;
   

    
    self.Parks = ParksService.Parks;

    self.newPark = ParksService.newPark;

    self.addParks = ParksService.addParks;

    self.getParks = ParksService.getParks;
    self.getParks();
    
    self.deletePark = ParksService.deletePark;
}]);
