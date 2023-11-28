module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  // Create a new User
  router.post("/", users.create);
  // Retrieve all Users
  router.get("/", users.findAll);
  app.use("/api/users", router);
};
