const express = require('express');

const { people } = require('../store');
const { Queue, display } = require('../queue');
const json = express.json();


const peopleRouter = express();
let peopleQueue = new Queue();

people.forEach(people => peopleQueue.enqueue(people));

peopleRouter
    .route('/')
    .get((req, res) => {
        let peopleLine = display(peopleQueue);
        return res.status(200).json({
            peopleLine: peopleLine
        })
    })

    .post(json, (req, res) => {
        const  name  = req.body;
        peopleQueue.enqueue(name);
        return res.status(200).json({name});
    })

    
    .delete((req, res) => {
        let peopleDequeue = peopleQueue.dequeue();

        return res.send({
            message: `${peopleDequeue} has chosen a pet and dequeued`
        })
    });

module.exports = {
    peopleRouter: peopleRouter,
    peopleQueue: peopleQueue

};