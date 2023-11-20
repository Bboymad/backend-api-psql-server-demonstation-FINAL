const express = require('express');
const app = express();

const { getTopics } = require('./controllers/controller.topics')

const {
    invalidEndpoint,
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
  } = require('./controllers/controller.errors');

app.get('/api/topics', getTopics);

app.all("*", invalidEndpoint); // do i need this error yet?

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;

