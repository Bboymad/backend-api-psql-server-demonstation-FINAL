const endpoints = require('../endpoints.json')

exports.getEndpoints = (req, res, next) => {
  res.status(200).json(endpoints)
    .catch((err) => 
    next(err))
};