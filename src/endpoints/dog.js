const express = require('express')
const dogRouter = express.Router()
const {adoptedQueue} = require('../adopted')
const {peopleQueue} = require('./people')
const { dogs } = require('../store')
const { Queue, display, isEmpty, peek } = require('../queue')
const jsonParser = express.json()


let dogQueue = new Queue();

dogs.forEach(dog => dogQueue.enqueue(dog))

dogRouter
    .route('/')
    //getting first dog
    .get((req, res, next) => {
        let firstDog = peek(dogQueue);
        return res.status(200).json({
            dog: firstDog
        })
    })


    //adopt a dog
    .delete(jsonParser, (req, res, next) => {

        let adoptedDog = dogQueue.dequeue();
        dogQueue.enqueue(adoptedDog);
        adoptedQueue.enqueue(adoptedDog);

        let peopleDequeue = peopleQueue.dequeue();
     
        
        if(peopleDequeue !== req.body.name) {
            peopleQueue.enqueue(peopleDequeue)
        }
       
        return res.send({
            adoptedList: display(adoptedQueue)
        })
    }) ;
module.exports = dogRouter;