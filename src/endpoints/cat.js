const express = require('express');
const { cats } = require('../store');
const { adoptedQueue } = require('../adopted');
const { peopleQueue } = require('./user');
const catRouter = express.Router();
const { Queue, display, peek } = require('../queue');
const json = express.json();


let catQueue = new Queue();

cats.forEach(cat => catQueue.enqueue(cat));


catRouter.get('/', (req, res) => {
        let firstCat = peek(catQueue);
        return res.status(200).json({
            cat: firstCat
        })
    });
    catRouter.delete('/',json, (req, res) => {

        let adoptedCat = catQueue.dequeue();
        
        catQueue.enqueue(adoptedCat);
        let newCat = peek(catQueue);
        
        return res.send({
            cat: newCat,
            adopted: adoptedCat
        })
    });
    
module.exports = catRouter;