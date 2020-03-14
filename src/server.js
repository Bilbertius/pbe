const express = require('express');
const cors = require('cors');
const {PORT} = require('./config');

const { dogRouter } = require('./endpoints/dog');
const { peopleRouter } = require('./endpoints/people');
const { adoptedRouter } = require('./adopted');
const { catRouter } = require('./endpoints/cat');

const app = express().Router();

app.use(cors({
  origin: 'https://petfulofit.now.sh'
}));
app.options('https://petfulofit.now.sh', cors());

app.use('/api/cat', catRouter);
app.use('/api/dog', dogRouter);
app.use('/api/people',peopleRouter);
app.use('/api/adopted',adoptedRouter);

// Catch-all 404 error handling
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

app.listen(PORT,()=>{
  console.log(`Serving on ${PORT}`);
});