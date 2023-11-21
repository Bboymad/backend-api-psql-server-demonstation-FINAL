const express = require('express');
const app = express();

const { getTopics } = require('./controllers/controller.topics')
const { getArticleById, getArticles } = require('./controllers/controller.aritcles')
const { getEndpoints } = require('./controllers/controller.endpoints')

const {
    invalidEndpoint,
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors
  } = require('./controllers/controller.errors');

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById)
app.get('/api', getEndpoints);
app.get('/api/articles', getArticles)

app.all("*", invalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;

