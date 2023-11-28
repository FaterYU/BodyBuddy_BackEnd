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
