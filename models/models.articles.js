const db = require('../db/connection');

exports.selectArticle = (id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
  .then(({ rows }) => {
    const article = rows[0]
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: 'Article not found'
      });
    }
    return article
  });
};
exports.selectArticleComments = (id) => {
  return db.query(
    `SELECT
      comment_id,
      votes,
      created_at,
      author,
      body,
      article_id
    FROM
      comments
    WHERE
      article_id = $1
    ORDER BY
      created_at DESC;`, [id])
  .then(({ rows }) => {
    return rows
  });
}