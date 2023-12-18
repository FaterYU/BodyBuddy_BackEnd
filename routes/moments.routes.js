module.exports = (app) => {
  const moments = require("../controllers/moments.controller.js");
  var router = require("express").Router();
  router.get("/findAll", moments.findAll);
  router.post("/findOne", moments.findOne);
  router.post("/create", moments.create);
  router.put("/update", moments.update);
  router.delete("/delete", moments.delete);
  router.post("/getMomentByAuthor", moments.getMomentByAuthor);
  router.post("/getFollowMoment", moments.getFollowMoment);
  router.post("/addComment", moments.addComment);

  app.use("/api/moments", router);
};
