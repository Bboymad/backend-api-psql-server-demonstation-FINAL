const { selectArticle, selectArticles } = require('../models/models.articles');

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