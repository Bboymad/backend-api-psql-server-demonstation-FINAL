const express = require('express');
const cors = require('cors');
const app = express();

const { getArticleById, getArticleComments, getArticles, postComment, patchArticle } = require('./controllers/controller.aritcles')

const { getTopics } = require('./controllers/controller.topics')

const { getEndpoints } = require('./controllers/controller.endpoints')

const { getUsers } = require('./controllers/controller.users')

const {
    invalidEndpoint,
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors
  } = require('./controllers/controller.errors');

app.use(cors());
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById)
app.get('/api', getEndpoints);
app.get('/api/articles/:article_id/comments', getArticleComments)
app.get('/api/articles', getArticles)
app.patch('/api/articles/:article_id', patchArticle)
app.post('/api/articles/:article_id/comments', postComment)
app.get('/api/users', getUsers)

app.all("*", invalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;

