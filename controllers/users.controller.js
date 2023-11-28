const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a User
  const users = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  // Save User in the database
  Users.create(users)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;
  Users.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
