module.exports = (app) => {
  const moments = require("../controllers/moments.controller.js");
  var router = require("express").Router();
  //   // Create a new Moment
  //   router.post("/", moments.create);
  // Retrieve all Moments
  router.get("/", moments.findAll);
  app.use("/api/moments", router);
};
