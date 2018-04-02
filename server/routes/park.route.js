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
    added_by: {type: String, required: true},
    edit: {type: Boolean, default: false},
    likes: {type: Number, default: 0 },
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

router.delete('/:id', (request, response) => {
    let id = request.params.id;
    Parks.findByIdAndRemove(
        {"_id": id},
        (error, success) => {
            if(error){
                console.log('error in delete', error);
                response.sendStatus(500);
            } else {
                response.sendStatus(200);
            }
        }
    )
});

router.put('/:id', (request , response)=> {
    let id = request.params.id;
    let parkToUpdate = request.body;
    console.log('park being updated', parkToUpdate);
    Parks.findByIdAndUpdate(
        {"_id": id},
        {$set: parkToUpdate},
        (error, result) =>{
            if(error){
                console.log('error in update' , error);
                response.sendStatus(500);
            } else {
                response.sendStatus(200)
            }
        }
    )
})







module.exports = router;
