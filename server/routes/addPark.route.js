var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkSchema = new Schema({
    // _id: {type: Number, required: true},
    street: {type: String , required: true},
    city: {type: String, required: true},
    zip: {type: String, required: true},
    poop_rate: {type: Number, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    added_by: {type: String, required: true}
})

const Parks = mongoose.model('Parks', ParkSchema, 'Parks')

router.get('/', (request, response)=>{
    Parks.find({}, (error, foundParks)=>{
        if(error){
            console.log('error in getting parks:', error);
            response.sendStatus(500);
        } else {
            response.send(foundParks);
        }
    })
});

router.post('/', (request, response)=> {
    console.log('request.body', request.body);
    
    let newPark = new Parks(request.body);
    console.log('park added', newPark);
    newPark.save((error, addedPark)=>{
        if(error){
            console.log('error in posting parks', error);
            response.sendStatus(500);
        }else {
            response.sendStatus(201);
        }
    })    
});

module.exports = router;


// router.get('/', (request, response) => {
//     Employee.find({}, (error, foundEmployees) => {
//       if (error){
//         console.log('error on find employees:', error);
//         response.sendStatus(500);
//       } else {
//         response.send(foundEmployees);
//       }
//     })
//   });
  
//   router.post('/', (request, response)=> {
//       let newEmployee = new Employee (request.body);
//       console.log('employee added', newEmployee);
//       newEmployee.save((error, addedEmployee ) => {
//           if(error){
//               console.log('error in posting employee', error);
//               response.sendStatus(500);
//           }else {
//               response.sendStatus(201);
//           }
//       })
//   });