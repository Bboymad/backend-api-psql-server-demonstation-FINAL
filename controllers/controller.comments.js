const { deleteCommentById } = require('../models/models.comments');

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentById(comment_id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  };
  