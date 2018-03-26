myApp.controller('ViewParkController', ['ViewParkService','ParksService', function(ViewParkService , ParksService) {
    console.log('view park controller created');
    var self = this;


    self.ParksService = ParksService;
   

    self.ViewParkService = ViewParkService;

    self.Parks = ParksService.Parks;

    self.newPark = ParksService.newPark;

    self.addParks = ParksService.addParks;

    self.getParks = ParksService.getParks;
    self.getParks();
    
}]);
