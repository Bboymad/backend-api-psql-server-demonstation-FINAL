const { selectArticle, selectArticles, insertComment } = require('../models/models.articles');

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
      selectArticle(article_id)
      .then((article) => {
        res.status(200).send({ article })
      })
      .catch((err) => 
      next(err))
    };

exports.getArticles = (req, res, next) => {
  const { articles } = req.params
  selectArticles(articles)
  .then((articles) => {
    res.status(200).send({ articles })
  })
  .catch((err) => 
  next(err))
  };

exports.postComment = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  insertComment(article_id, newComment)
  .then((comment) => {
    res.status(201).send({ comment: comment })
  })
  .catch((err) => 
  next(err))
}