
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dogRouter = require('./endpoints/dog');
const catRouter = require('./endpoints/cat');
const userRouter = require('./endpoints/user');
const { PORT } = require('./config');


const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());

app.use(express.json());
app.use('/api/dog', dogRouter);
app.use('/api/cat', catRouter);
app.use('/api/user', userRouter);


// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});


module.exports  = app;
app.listen(PORT,()=>{
  console.log(`Serving on ${PORT}`);
});