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
       
        self.Parks.list = response.data;
    }).catch(function(error){
        console.log('error in add park get', response);
    })
}

self.getParks();

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

self.updatePark = function(park){
    console.log('THIS IS THE PARK', park );
    
    $http({
        method: 'PUT',
        url: `/park/${park._id}`,
        data: park
    }).then(function(response){
        console.log('success in update', response);
        self.getParks();
    }).catch(function(error){
        console.log('error in update', error);
        
    })
}


// self.updateEmployee = function(employee){
//     $http({
//       method: 'PUT',
//       url: `/employees/${employee._id}`,
//       data: employee
//     }).then(function(response){
//       console.log('success in edit', response);
//       self.getEmployees();
//       self.runReports();
//     }).catch(function(error){
//       console.log('errir in edit', error);
//     })
//   }


self.popUp = function(){
    let add = alert("Successfully added Park")
}



}]);//end service