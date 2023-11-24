const db = require('../db/connection');

exports.deleteCommentById = (comment_id) => {
    return db.query('SELECT * FROM comments WHERE comment_id = $1;', [comment_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          throw { status: 404, msg: `comment_id ${comment_id} not found` };
        }
        return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id]);
      });
  };