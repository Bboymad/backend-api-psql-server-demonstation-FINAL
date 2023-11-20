const express = require('express');
const app = express();

const { getTopics } = require('./controllers/controller.topics')

const {
    invalidEndpoint,
  } = require('./controllers/controller.errors');

app.get('/api/topics', getTopics);

app.all("*", invalidEndpoint);

module.exports = app;

