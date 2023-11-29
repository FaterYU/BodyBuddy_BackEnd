const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const Poses = db.poses;

exports.findAllPose = (req, res) => {
  Poses.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving poses.",
      });
    });
};
exports.createPose = (req, res) => {
  const pose = {
    name: req.body.name,
    photo: req.body.photo,
    content: req.body.content,
    tags: req.body.tags,
    repetition: req.body.repetition,
    like: req.body.like,
    practiced: req.body.practiced,
  };
  Poses.create(pose)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the pose.",
      });
    });
};
exports.updatePose = (req, res) => {
  const id = req.body.id;
  Poses.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pose was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Pose with id=${id}. Maybe Pose was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Pose with id=" + id,
      });
    });
};
exports.deletePose = (req, res) => {
  const id = req.body.id;
  Poses.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pose was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Pose with id=${id}. Maybe Pose was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Pose with id=" + id,
      });
    });
};
