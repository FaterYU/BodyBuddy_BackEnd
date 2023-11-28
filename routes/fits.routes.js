module.exports = (app) => {
  const fits = require("../controllers/fits.controller.js");
  var router = require("express").Router();
  //   // Create a new Fit
  //   router.post("/", fits.create);
  // Retrieve all Fits
  router.get("/", fits.findAll);
  app.use("/api/fits", router);
};
