const db = require("../models");
const Fits = db.fits;
const Op = db.Sequelize.Op;
const Poses = db.poses;
const Courses = db.courses;
const User = db.users;

exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;
  Fits.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving fits.",
      });
    });
};
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Fit
  const fit = {
    userId: req.body.userId,
    courseId: req.body.courseId,
    userVideo: { poseVideoList: [] },
    score: { poseScoreList: [], totalScore: null },
    latency: null,
    status: "pending",
  };
  User.findByPk(fit.userId)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "User not found with id " + fit.userId,
        });
        return;
      }
      return Courses.findByPk(fit.courseId);
    })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Course not found with id " + fit.courseId,
        });
        return;
      }
      return data.content.poseList;
    })
    .then((data) => {
      var poseIdx = 0;
      data.forEach((element) => {
        fit.userVideo.poseVideoList.push({
          poseIdx: poseIdx,
          poseId: element,
          video: null,
        });
        fit.score.poseScoreList.push({
          poseIdx: poseIdx,
          poseId: element,
          score: null,
        });
        poseIdx++;
      });
      return Fits.create(fit);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Fit.",
      });
    });
};
exports.findListByUserId = (req, res) => {
  const userId = req.body.userId;
  Fits.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Fit with userId=" + userId,
      });
    });
};
exports.deleteByFitsId = (req, res) => {
  const id = req.body.id;
  Fits.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Fit was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Fit with id=${id}. Maybe Fit was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Fit with id=" + id,
      });
    });
};
exports.setVideoByPoseIdx = (req, res) => {
  const id = req.body.id;
  const poseIdx = req.body.poseIdx;
  const video = req.body.video;
  Fits.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Fit not found with id " + id,
        });
        return;
      }
      const poseVideoList = data.userVideo.poseVideoList;
      poseVideoList[poseIdx].video = video;
      return Fits.update(
        { userVideo: { poseVideoList: poseVideoList } },
        {
          where: { id: id },
        }
      );
    })
    .then((data) => {
      res.send({
        message:
          "Fit was updated successfully! The number of updated rows is " + data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Fit with id=" + id,
      });
    });
};
exports.getOneFitById = (req, res) => {
  const id = req.body.id;
  Fits.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Fit not found with id " + id,
        });
        return;
      }
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Fit with id=" + id,
      });
    });
};
exports.getOneFitScoreById = (req, res) => {
  const id = req.body.id;
  Fits.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Fit not found with id " + id,
        });
        return;
      }
      if (data.status == "pending") {
        res.status(400).send({
          message: "Fit is pending",
        });
        return;
      } else if (data.status == "scoring") {
        res.status(400).send({
          message: "Fit is scoring",
        });
        return;
      }
      res.send(data.score);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Fit with id=" + id,
      });
    });
};

exports.getRandomScore = (req, res) => {
  const id = req.body.id;
  var scoreList = [];
  for (var i = 0; i < 100; i++) {
    scoreList.push(Math.random() * 40 + 50);
  }
  res.send(scoreList);
};
