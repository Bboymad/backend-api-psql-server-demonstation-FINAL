const express = require('express');
const app = express();

const { getArticleById, getArticleComments, getArticles, postComment } = require('./controllers/controller.aritcles')

const { getTopics } = require('./controllers/controller.topics')

const { getEndpoints } = require('./controllers/controller.endpoints')

const {
    invalidEndpoint,
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors
  } = require('./controllers/controller.errors');

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById)
app.get('/api', getEndpoints);
app.get('/api/articles/:article_id/comments', getArticleComments)
app.get('/api/articles', getArticles)
app.post('/api/articles/:article_id/comments', postComment)


app.all("*", invalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;

