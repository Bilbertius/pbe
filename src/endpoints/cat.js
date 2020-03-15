const express = require('express');

const adopted = require('../adopted');
const { cats } = require('../store');
const { adoptedQueue } = require('../adopted');
const { peopleQueue } = require('./people');
const catRouter = express.Router();
const { Queue, display, isEmpty, peek } = require('../queue')
const jsonParser = express.json()


let catQueue = new Queue();

cats.forEach(cat => catQueue.enqueue(cat))


catRouter.get('/', (req, res, next) => {
        let firstCat = peek(catQueue)
        return res.status(200).json({
            cat: firstCat
        })
    })
    catRouter.delete('/',jsonParser, (req, res, next) => {


        let adoptedCat = catQueue.dequeue();
        catQueue.enqueue(adoptedCat);
        adoptedQueue.enqueue(adoptedCat);

        let peopleDequeue = peopleQueue.dequeue();

        if(peopleDequeue !== req.body.name) {
            peopleQueue.enqueue(peopleDequeue)
        }
        
        return res.send({
            adoptedList: display(adoptedQueue)
        })
    }) ;
module.exports = catRouter;