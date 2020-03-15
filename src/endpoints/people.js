const express = require('express');

const { people } = require('../store');
const { Queue, display, isEmpty, peek } = require('../queue');
const json = express.json();


const peopleRouter = express();
let peopleQueue = new Queue();

people.forEach(people => peopleQueue.enqueue(people));

peopleRouter
    .route('/')
    .get((req, res, next) => {
        let peopleLine = display(peopleQueue);
        return res.status(200).json({
            peopleLine: peopleLine
        })
    })

    .post(json, (req, res, next) => {
        const { name } = req.body;
        peopleQueue.enqueue(name);
        return res.status(200).json();
    })

    
    .delete((req, res, next) => {
        let peopleDequeue = peopleQueue.dequeue();

        return res.send({
            message: `${peopleDequeue} has chosen a pet and dequeued`
        })
    });

module.exports = {
    peopleRouter: peopleRouter,
    peopleQueue: peopleQueue

};