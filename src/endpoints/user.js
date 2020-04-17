const express = require('express');
const userRouter = express.Router();
const { users } = require('../store');
const { Queue, display } = require('../queue');
const bodyParser = require('body-parser');


let userQueue = new Queue();

users.forEach(user => userQueue.enqueue(user));

userRouter.get('/',(req, res) => {
        let userLine = display(userQueue);
        return res.status(200).json({
            userLine: userLine
        })
    })

  userRouter.post('/', bodyParser, (req, res) => {
        const name  = req.body.user;
        userQueue.enqueue(name)
        return res.status(200).json({message: name + ' has entered the queue'});
    })
   userRouter.delete('/', (req, res) => {
        const user = userQueue.dequeue();
        userQueue.enqueue(user);
        let userLine = display(userQueue);
        res.send(userLine);
    });

module.exports = userRouter;