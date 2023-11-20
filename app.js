const express = require('express');
const app = express();

const { getTopics } = require('./controllers/controller.topics')
const { getEndpoints } = require('./controllers/controller.endpoints')

const {
    invalidEndpoint,
  } = require('./controllers/controller.errors');

app.get('/api/topics', getTopics);
app.get('/api', getEndpoints);

app.all("*", invalidEndpoint);

module.exports = app;

