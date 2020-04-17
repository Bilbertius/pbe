const express = require('express');
const json = express.json();
const { dogs } = require('../store');
const { Queue, display,peek } = require('../queue');


const dogRouter = express.Router();
let dogQueue = new Queue();

dogs.forEach(dog => dogQueue.enqueue(dog));

dogRouter.get('/', (req, res) => {
        let firstDog = peek(dogQueue);
        return res.status(200).json({
            dog: firstDog
        })
    })

    //adopt a dog
dogRouter.delete('/',json, (req, res) => {
    
    let adoptedDog = dogQueue.dequeue();
    dogQueue.enqueue(adoptedDog);
    
    return res.send({
        adopted: adoptedDog
    })
}) ;


module.exports = dogRouter;