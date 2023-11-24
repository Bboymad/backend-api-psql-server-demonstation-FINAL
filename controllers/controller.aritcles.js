const { selectArticle, selectArticles, selectArticleComments, updateArticleById } = require('../models/models.articles');


exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
      selectArticle(article_id)
      .then((article) => {
        res.status(200).send({ article })
      })
      .catch((err) => 
      next(err))
};
exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleComments(article_id)
  .then((comments) => {
    if (comments.length === 0) {
        return selectArticle(article_id)
          .then((article) => {
            if (article) {
              return res.status(200).send({ comments });
            } else {
              return res.status(404).send({ msg: 'Article not found' });
            }
          });
      }
      return res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
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
exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params
  const update = req.body

  selectArticle(article_id)
    .then((existingArticle) => {
      if (!existingArticle) {
        throw {
          status: 404,
          msg: 'Article not found',
        };
      }
      return updateArticleById(article_id, update);
    })
    .then((article) => {
      res.status(200).send({ article });
    })
  .catch((err) => 
  next(err))
  };

