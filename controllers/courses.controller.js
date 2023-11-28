const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const Poses = db.poses;

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Courses.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
