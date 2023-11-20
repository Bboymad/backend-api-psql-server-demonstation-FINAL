const express = require('express');
const app = express();

const { getTopics } = require('./controllers/controller.topics')
const { getArticleById } = require('./controllers/controller.aritcles')
const {
    invalidEndpoint,
    handleCustomErrors,
    handlePsqlErrors
  } = require('./controllers/controller.errors');

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById)

app.all("*", invalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app;

