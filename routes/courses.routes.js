module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();
  router.get("/findAllPose", courses.findAllPose);
  router.post("/createPose", courses.createPose);
  router.put("/updatePose", courses.updatePose);
  router.delete("/deletePose", courses.deletePose);

  app.use("/api/courses", router);
};
