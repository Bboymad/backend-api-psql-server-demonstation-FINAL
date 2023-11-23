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
exports.selectArticles = () => {
  return db.query(
    `SELECT 
      a.author,
      a.title,
      a.article_id,
      a.topic,
      a.created_at,
      a.votes,
      a.article_img_url, 
      CAST(COUNT(c.comment_id) AS INTEGER) AS comment_count 
    FROM 
      articles AS a 
    LEFT JOIN
      comments AS c
    ON
      a.article_id = c.article_id
    GROUP BY
      a.article_id
    ORDER BY
      a.created_at DESC;`)
      .then(({ rows }) => {
        return rows
      })
};
exports.insertComment = (article_id, newComment) => {
  const { username, body } = newComment

  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: 'Required information is missing',
    });
  }


  return db.query(`
  INSERT INTO comments
  (body, article_id, author)
  VALUES
  ($1, $2, $3)
  RETURNING *;
`, [body, article_id, username])
  .then(({rows}) => {
    return rows[0]
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}