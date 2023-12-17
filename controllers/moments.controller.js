const db = require("../models");
const Moments = db.moments;
const Op = db.Sequelize.Op;
const Users = db.users;

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Moments.findAll({ where: condition, order: [["updatedAt", "DESC"]] })
    .then((data) => {
      var data = JSON.parse(JSON.stringify(data));
      for (var i = 0; i < data.length; i++) {
        data[i]["showId"] = i + 1;
      }
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving moments.",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.body.id;
  Moments.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Moments with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error retrieving Moments with id=${id}`,
      });
    });
};
exports.create = (req, res) => {
  if (!req.body.author) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const moment = {
    author: req.body.author,
    photo: req.body.photo,
    content: req.body.content,
    tags: req.body.tags,
    like: 0,
    comment: { commentList: [] },
    lastUpdate: new Date(),
  };
  Moments.create(moment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Moment.",
      });
    });
};
exports.update = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const id = req.body.id;
  Moments.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Moment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Moment with id=${id}. Maybe Moment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error updating Moment with id=${id}`,
      });
    });
};
exports.delete = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const id = req.body.id;
  Moments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Moment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Moment with id=${id}. Maybe Moment was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Could not delete Moment with id=${id}`,
      });
    });
};
exports.getMomentByAuthor = (req, res) => {
  const author = req.body.author;
  Moments.findAll({ where: { author: author }, order: [["updatedAt", "DESC"]] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Moments with author=${author}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error retrieving Moments with author=${author}`,
      });
    });
};
exports.getFollowMoment = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (data) {
        const follow = data.follow.followList;
        Moments.findAll({
          where: { author: { [Op.in]: follow } },
          order: [["updatedAt", "DESC"]],
        })
          .then((data) => {
            if (data) {
              var data = JSON.parse(JSON.stringify(data));
              for (var i = 0; i < data.length; i++) {
                data[i]["showId"] = i + 1;
              }
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Moments with author=${author}.`,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: `Error retrieving Moments with author=${author}`,
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find User with uid=${uid}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error retrieving User with uid=${uid}`,
      });
    });
};
