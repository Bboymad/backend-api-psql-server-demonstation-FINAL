const { getAllUsers } = require('../models/model.users');

exports.getUsers = (req, res) => {
    getAllUsers().then((users) => {
      res.status(200).send({ users });
    });
  };