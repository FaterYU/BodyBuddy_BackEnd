module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  router.post("/create", users.create);
  router.post("/findAll", users.findAll);
  router.post("/findOne", users.findOne);
  router.put("/update", users.update);
  router.delete("/delete", users.delete);
  router.post("/getName", users.getName);

  app.use("/api/users", router);
};
