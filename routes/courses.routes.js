module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();
  router.get("/findAllPose", courses.findAllPose);
  router.post("/createPose", courses.createPose);
  router.put("/updatePose", courses.updatePose);
  router.delete("/deletePose", courses.deletePose);

  router.get("/findAllCourse", courses.findAllCourse);
  router.post("/createCourse", courses.createCourse);
  router.put("/updateCourse", courses.updateCourse);
  router.delete("/deleteCourse", courses.deleteCourse);
  router.post("/getCourseList", courses.getCourseList);
  router.post("/getCourseNameById", courses.getCourseNameById);
  router.post("/getCourseById", courses.getCourseById);

  app.use("/api/courses", router);
};
