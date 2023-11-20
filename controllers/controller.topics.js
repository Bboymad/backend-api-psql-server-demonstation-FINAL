const { selectTopics } = require('../models/model.topics');

exports.getTopics = (req, res, next) => {
    const { topics } = req.params;
    selectTopics(topics)
    .then((topics) => {
        if (topics.length === 0) {
            res.status(400).send({msg: "Bad request: No Topics"})
        }
        else {
            res.status(200).send({topics})
        }
    })
    .catch((err) => 
    next(err))
}