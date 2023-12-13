const express = require("express");
const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const Courses = db.courses;
const Poses = db.poses;
const Moments = db.moments;
const Fits = db.fits;

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
    password: req.body.password,
    photo: req.body.photo,
    role: "user",
    courses: { courseList: [] },
    follow: { followList: [] },
    calendar: { calendarList: [], calendarActivityCount: 1 },
    infomation: req.body.infomation,
    level: "1",
    feature: { likeCourse: [], likePose: [], likeMoment: [] },
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
      return {
        promise: Users.update(
          { lastLogin: new Date() },
          { where: { uid: uid } }
        ),
        uid: uid,
      };
    })
    .then((data) => {
      if (data.promise == null) return;
      return Users.findByPk(data.uid);
    })
    .then((data) => {
      if (data == null) return;
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

exports.follow = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.follow;
      }
    })
    .then((follow) => {
      if (follow == null) return;
      const followList = follow.followList;
      const followId = req.body.followId;
      if (followList.includes(followId)) {
        res.send({ message: "Already followed" });
        return;
      }
      followList.push(followId);
      Users.update(
        { follow: { followList: followList } },
        { where: { uid: uid } }
      );
      res.send({ message: "Followed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.unfollow = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.follow;
      }
    })
    .then((follow) => {
      if (follow == null) return;
      const followList = follow.followList;
      const followId = req.body.followId;
      if (!followList.includes(followId)) {
        res.send({ message: "Already unfollowed" });
        return;
      }
      followList.splice(followList.indexOf(followId), 1);
      Users.update(
        { follow: { followList: followList } },
        { where: { uid: uid } }
      );
      res.send({ message: "Unfollowed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.getFollowList = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.follow;
      }
    })
    .then((follow) => {
      if (follow == null) return;
      const followList = follow.followList;
      Users.findAll({
        where: { uid: { [Op.in]: followList } },
        attributes: ["uid", "userName", "photo"],
      })
        .then((data) => {
          res.send(data);
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
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.getFollowedList = (req, res) => {
  const uid = req.body.uid;
  Users.findAll({
    where: { follow: db.Sequelize.literal(`follow like '%${uid}%'`) },
    attributes: ["uid", "userName", "photo"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.likeCourse = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likeCourse = feature.likeCourse;
      const courseId = req.body.courseId;
      if (likeCourse.includes(courseId)) {
        res.send({ message: "Already liked" });
        return;
      }
      likeCourse.push(courseId);
      const newFeature = feature;
      newFeature.likeCourse = likeCourse;
      Courses.findByPk(courseId)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found Course with id " + courseId,
            });
          } else {
            return data.like;
          }
        })
        .then((like) => {
          if (like == null) return;
          like += 1;
          Courses.update({ like: like }, { where: { id: courseId } });
        });
      Users.update({ feature: newFeature }, { where: { uid: uid } });
      res.send({ message: "Liked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.unlikeCourse = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likeCourse = feature.likeCourse;
      const newFeature = feature;
      if (!likeCourse.includes(courseId)) {
        res.send({ message: "Already unliked" });
        return;
      }
      likeCourse.splice(likeCourse.indexOf(courseId), 1);
      newFeature.likeCourse = likeCourse;
      const courseId = req.body.courseId;
      Courses.findByPk(courseId)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found Course with id " + courseId,
            });
          } else {
            return data.like;
          }
        })
        .then((like) => {
          if (like == null) return;
          like -= 1;
          Courses.update({ like: like }, { where: { id: courseId } });
        });
      Users.update({ feature: newFeature }, { where: { uid: uid } });
      res.send({ message: "Unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.checkLikeCourse = (req, res) => {
  const uid = req.body.uid;
  const courseId = req.body.courseId;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likeCourse = feature.likeCourse;
      if (likeCourse.includes(courseId)) {
        res.send({ message: "Liked" });
        return;
      }
      res.send({ message: "Unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.likePose = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likePose = feature.likePose;
      const poseId = req.body.poseId;
      if (likePose.includes(poseId)) {
        res.send({ message: "Already liked" });
        return;
      }
      likePose.push(poseId);
      const newFeature = feature;
      newFeature.likePose = likePose;
      Poses.findByPk(poseId)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found Pose with id " + poseId,
            });
          } else {
            return data.like;
          }
        })
        .then((like) => {
          if (like == null) return;
          like += 1;
          Poses.update({ like: like }, { where: { id: poseId } });
        });
      Users.update({ feature: newFeature }, { where: { uid: uid } });
      res.send({ message: "Liked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.unlikePose = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likePose = feature.likePose;
      const poseId = req.body.poseId;
      if (!likePose.includes(poseId)) {
        res.send({ message: "Already unliked" });
        return;
      }
      likePose.splice(likePose.indexOf(poseId), 1);
      const newFeature = feature;
      newFeature.likePose = likePose;
      Poses.findByPk(poseId)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found Pose with id " + poseId,
            });
          } else {
            return data.like;
          }
        })
        .then((like) => {
          if (like == null) return;
          like -= 1;
          Poses.update({ like: like }, { where: { id: poseId } });
        });
      Users.update({ feature: newFeature }, { where: { uid: uid } });
      res.send({ message: "Unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.checkLikePose = (req, res) => {
  const uid = req.body.uid;
  const poseId = req.body.poseId;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with poseId " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likePose = feature.likePose;
      if (likePose.includes(poseId)) {
        res.send({ message: "Liked" });
        return;
      }
      res.send({ message: "Unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with poseId=" + uid,
      });
    });
};
exports.likeMoment = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Moment with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likeMoment = feature.likeMoment;
      const momentId = req.body.momentId;
      if (likeMoment.includes(momentId)) {
        res.send({ message: "Already liked" });
        return;
      }
      likeMoment.push(momentId);
      const newFeature = feature;
      newFeature.likeMoment = likeMoment;
      Moments.findByPk(momentId)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found Moment with id " + momentId,
            });
          } else {
            return data.like;
          }
        })
        .then((like) => {
          if (like == null) return;
          like += 1;
          Moments.update({ like: like }, { where: { id: momentId } });
        });
      Users.update({ feature: newFeature }, { where: { uid: uid } });
      res.send({ message: "Liked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Moment with id=" + uid,
      });
    });
};
exports.unlikeMoment = (req, res) => {
  const uid = req.body.uid;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Moment with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likeMoment = feature.likeMoment;
      const momentId = req.body.momentId;
      if (!likeMoment.includes(momentId)) {
        res.send({ message: "Already unliked" });
        return;
      }
      likeMoment.splice(likeMoment.indexOf(momentId), 1);
      const newFeature = feature;
      newFeature.likeMoment = likeMoment;
      Moments.findByPk(momentId)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: "Not found Moment with id " + momentId,
            });
          } else {
            return data.like;
          }
        })
        .then((like) => {
          if (like == null) return;
          like -= 1;
          Moments.update({ like: like }, { where: { id: momentId } });
        });
      Users.update({ feature: newFeature }, { where: { uid: uid } });
      res.send({ message: "Unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Moment with id=" + uid,
      });
    });
};
exports.checkLikeMoment = (req, res) => {
  const uid = req.body.uid;
  const momentId = req.body.momentId;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Moment with id " + uid,
        });
      } else {
        return data.feature;
      }
    })
    .then((feature) => {
      if (feature == null) return;
      const likeMoment = feature.likeMoment;
      if (likeMoment.includes(momentId)) {
        res.send({ message: "Liked" });
        return;
      }
      res.send({ message: "Unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Moment with id=" + uid,
      });
    });
};
exports.getMomentFollowLikeList = (req, res) => {
  const uid = req.body.uid;
  const momentId = req.body.momentId;
  Users.findByPk(uid)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Moment with id " + uid,
        });
      } else {
        return data.follow;
      }
    })
    .then((follow) => {
      if (follow == null) return;
      const followList = follow.followList;
      Users.findAll({
        where: { uid: { [Op.in]: followList } },
        attributes: ["uid", "userName", "photo", "feature"],
      })
        .then((data) => {
          const likeList = [];
          data.forEach((user) => {
            if (user.feature.likeMoment.includes(momentId)) {
              likeList.push(user);
            }
          });
          res.send(likeList);
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
        message: "Error retrieving Moment with id=" + uid,
      });
    });
};
exports.globalSearch = (req, res) => {
  const keyword = req.body.keyword;
  const uid = req.body.uid;
  const result = {
    users: [],
    courses: [],
    poses: [],
    moments: [],
    fits: [],
  };
  Users.findAll({
    where: { userName: { [Op.like]: `%${keyword}%` } },
    attributes: ["uid", "userName", "photo"],
  })
    .then((data) => {
      result.users = data;
      return Courses.findAll({
        where: { name: { [Op.like]: `%${keyword}%` } },
        attributes: ["id", "name", "photo", "duration", "infomation"],
      });
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
      result.courses = courseList;
      return Poses.findAll({
        where: { name: { [Op.like]: `%${keyword}%` } },
        attributes: ["id", "name", "photo"],
      });
    })
    .then((data) => {
      result.poses = data;
      return Moments.findAll({
        where: { content: { [Op.like]: `%${keyword}%` } },
        attributes: ["id", "content", "photo", "author"],
      });
    })
    .then((data) => {
      result.moments = data;
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving keyword=" + keyword,
      });
    });
};
exports.getCalendarActivity = async (req, res) => {
  const uid = req.body.uid;
  try {
    const user = await Users.findByPk(uid);

    if (user == null) {
      res.status(404).send({
        message: "Not found User with id " + uid,
      });
      return;
    }

    const calendarList = user.calendar.calendarList;
    const result = [];

    await Promise.all(
      calendarList.map(async (item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const activityDate = {
          year: year,
          month: month,
          day: day,
        };

        const resultSublist = item.activityList;
        const activityList = [];

        await Promise.all(
          resultSublist.map(async (subitem) => {
            const activityId = subitem.activityId;
            const activityStartTime = subitem.activityStartTime;
            const activityEndTime = subitem.activityEndTime;
            const activityContent = subitem.activityContent;
            const activityCourseId = subitem.activityCourseId;
            var Course = null;
            if (activityCourseId != null) {
              const courseData = await Courses.findByPk(activityCourseId);

              if (courseData == null) {
                res.status(404).send({
                  message: "Not found Course with id " + activityCourseId,
                });
                return;
              }
              Course = {
                id: courseData.id,
                name: courseData.name,
                photo: courseData.photo,
              };
            } else {
              Course = null;
            }

            activityList.push({
              activityId: activityId,
              activityDate: activityDate,
              activityStartTime: activityStartTime,
              activityEndTime: activityEndTime,
              activityContent: activityContent,
              activityCourse: Course,
            });
          })
        );
        activityList.sort((a, b) => {
          if (a.activityStartTime.hour < b.activityStartTime.hour) {
            return -1;
          } else if (a.activityStartTime.hour > b.activityStartTime.hour) {
            return 1;
          } else {
            if (a.activityStartTime.minute < b.activityStartTime.minute) {
              return -1;
            } else if (
              a.activityStartTime.minute > b.activityStartTime.minute
            ) {
              return 1;
            } else {
              return 0;
            }
          }
        });

        result.push({
          activityDate: activityDate,
          activityList: activityList,
        });
      })
    );
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.addCalendarActivity = (req, res) => {
  const uid = req.body.uid;
  const activityDate = req.body.activityDate;
  const activityStartTime = req.body.activityStartTime;
  const activityEndTime = req.body.activityEndTime;
  const activityContent = req.body.activityContent;
  const activityCourseId = req.body.activityCourseId
    ? req.body.activityCourseId
    : null;
  const calendarActivity = {
    activityId: undefined,
    activityDate: activityDate,
    activityStartTime: {
      hour: activityStartTime.hour,
      minute: activityStartTime.minute,
    },
    activityEndTime: {
      hour: activityEndTime.hour,
      minute: activityEndTime.minute,
    },
    activityContent: activityContent,
    activityCourseId: activityCourseId,
  };
  Users.findByPk(uid)
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
        return;
      }
      const calendarList = data.calendar.calendarList;
      const calendarActivityCount = data.calendar.calendarActivityCount;
      calendarActivity.activityId = calendarActivityCount;
      const calendarDate = new Date(
        activityDate.year,
        activityDate.month - 1,
        activityDate.day
      );
      var flag = false;
      calendarList.forEach((item) => {
        const date = new Date(item.date);
        if (date.getTime() == calendarDate.getTime()) {
          item.activityList.push(calendarActivity);
          flag = true;
        }
      });
      if (!flag) {
        calendarList.push({
          date: calendarDate,
          activityList: [calendarActivity],
        });
      }
      calendarList.sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) {
          return -1;
        } else if (a.date.getTime() > b.date.getTime()) {
          return 1;
        } else {
          return 0;
        }
      });
      Users.update(
        {
          calendar: {
            calendarList: calendarList,
            calendarActivityCount: calendarActivityCount + 1,
          },
        },
        { where: { uid: uid } }
      );
      res.send({ message: "Added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
exports.deleteCalendarActivity = (req, res) => {
  const uid = req.body.uid;
  const activityId = req.body.activityId;
  Users.findByPk(uid)
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: "Not found User with id " + uid,
        });
        return;
      }
      const calendarList = data.calendar.calendarList;
      const calendarActivityCount = data.calendar.calendarActivityCount;
      calendarList.forEach((item) => {
        const activityList = item.activityList;
        activityList.forEach((subitem) => {
          if (subitem.activityId == activityId) {
            activityList.splice(activityList.indexOf(subitem), 1);
          }
        });
        if (activityList.length == 0) {
          calendarList.splice(calendarList.indexOf(item), 1);
        }
      });
      Users.update(
        {
          calendar: {
            calendarList: calendarList,
            calendarActivityCount: calendarActivityCount,
          },
        },
        { where: { uid: uid } }
      );
      res.send({ message: "Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id=" + uid,
      });
    });
};
