myApp.service('ParksService', ['$http', '$location', function ($http, $location) {


    var self = this;
    self.added_by = '';
    self.Parks = {list: []};
    self.newPark = {};

self.getParks = function(){
    $http({
        method:'GET',
        url: '/park'
    }).then(function(response){
        console.log('succes in add park get', response);
        self.Parks.list = response.data;
    }).catch(function(error){
        console.log('error in add park get', response);
    })
}


self.addParks = function (park, user){
    console.log(user.userName);
    park.added_by = user.userName;
    console.log('park', park);
    $http({
        method: 'POST',
        url: '/park',
        data: park
    }).then(function(response){
        console.log('success in post', response);
        self.getParks();           
    }).catch(function(error){
        console.log('error in post', error.config.data);
    })
}
    self.deletePark = function(id){
    console.log('this is id', id);
    
    $http({
        method:'DELETE',
        url:`/park/${id}`
    })
    .then((response)=>{
        console.log('spot deleted');
    self.getParks();
    })
    .catch((error)=>{
        console.log('error', error);
    })
}


}]);//end service