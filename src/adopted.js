const express = require('express')
const { Queue, display, isEmpty, peek } = require('./queue')
const adoptedRouter = express.Router()

let adoptedQueue = new Queue()

adoptedRouter
    .route('/')
    .get((req, res, next) => {
 
        return res.status(200).json({
            message: 'sending adoption queue'
        })
    })
module.exports = {
    adoptedQueue: adoptedQueue,
    adoptedRouter: adoptedRouter
}