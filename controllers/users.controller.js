const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body.userName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const users = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    photo: req.body.photo,
    role: "user",
    infomation: req.body.infomation,
    level: "1",
    LastLogin: new Date(),
  };
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
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Users.findAll()
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
// Find a single User with an id
exports.findOne = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
// Update a User by the id in the request
exports.update = (req, res) => {
  const uid = req.body.uid;
  Users.update(req.body, {
    where: { uid: uid },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${uid}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating User with id=" + uid,
      });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const uid = req.body.uid;
  Users.destroy({
    where: { uid: uid },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${uid}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete User with id=" + uid,
      });
    });
};
// get User name by uid
exports.getName = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        res.send({ userName: data.userName });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({
    where: { email: email, password: password },
    attributes: ["uid"],
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with email " + email,
        });
        return null;
      } else {
        return data.uid;
      }
    })
    .then((uid) => {
      if (uid == null) return;
      Users.update({ LastLogin: new Date() }, { where: { uid: uid } });
      return uid;
    })
    .then((uid) => {
      if (uid == null) return;
      Users.findByPk(uid)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found User with id " + uid,
            });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message: "Error retrieving User with id=" + uid,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};
