const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const Poses = db.poses;
const Fits = db.fits;

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
    video: req.body.video,
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
exports.findAllCourse = (req, res) => {
  Courses.findAll()
    .then(async (data) => {
      const result = [];
      await Promise.all(
        data.map(async (course) => {
          const uniquePoseList = [...new Set(course.content.poseList)];
          await Promise.all(
            uniquePoseList.map(async (poseId) => {
              await Poses.findOne({
                where: {
                  id: poseId,
                },
              }).then((pose) => {
                for (var i = 0; i < course.content.poseList.length; i++) {
                  if (course.content.poseList[i] == poseId) {
                    course.content.poseList[i] = pose;
                  }
                }
              });
            })
          );
          result.push(course);
        })
      );
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
exports.createCourse = (req, res) => {
  const course = {
    name: req.body.name,
    photo: req.body.photo,
    content: req.body.content,
    duration: req.body.duration,
    infomation: req.body.infomation,
    like: 0,
  };
  Courses.create(course)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the course.",
      });
    });
};
exports.updateCourse = (req, res) => {
  const id = req.body.id;
  Courses.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Course with id=" + id,
      });
    });
};
exports.deleteCourse = (req, res) => {
  const id = req.body.id;
  Courses.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Course with id=" + id,
      });
    });
};
exports.getCourseList = (req, res) => {
  const userId = req.body.uid ? req.body.uid : null;
  Courses.findAll({
    attributes: ["id", "name", "photo", "duration", "infomation"],
  })
    .then((data) => {
      const courseList = [];
      data.forEach((course) => {
        courseList.push({
          id: course.id,
          name: course.name,
          photo: course.photo,
          duration: course.duration / 60,
          calorie: course.infomation.calorie,
        });
      });
      return courseList;
    })
    .then(async (courseList) => {
      await Promise.all(
        courseList.map(async (course) => {
          await Fits.count({
            where: {
              courseId: course.id,
            },
          }).then((num) => {
            course.practiced = num;
          });
        })
      );
      return courseList;
    })
    .then(async (courseList) => {
      if (userId) {
        await Promise.all(
          courseList.map(async (course) => {
            await Fits.count({
              where: {
                userId: userId,
                courseId: course.id,
              },
            }).then((num) => {
              course.userPracticed = num;
            });
          })
        );
      }
      res.send(courseList);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCourseNameById = (req, res) => {
  Courses.findOne({
    attributes: ["name"],
    where: {
      id: req.body.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCourseById = (req, res) => {
  Courses.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
