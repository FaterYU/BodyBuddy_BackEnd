module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();
  //   // Create a new Course
  //   router.post("/", courses.create);
  // Retrieve all Courses
  router.get("/", courses.findAll);
  app.use("/api/courses", router);
};
