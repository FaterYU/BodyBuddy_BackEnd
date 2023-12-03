module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  router.post("/create", users.create);
  router.get("/findAll", users.findAll);
  router.post("/findOne", users.findOne);
  router.put("/update", users.update);
  router.delete("/delete", users.delete);
  router.post("/getName", users.getName);
  router.post("/login", users.login);
  router.post("/follow", users.follow);
  router.post("/unfollow", users.unfollow);
  router.post("/getFollowList", users.getFollowList);
  router.post("/getFollowedList", users.getFollowedList);
  router.post("/likeCourse", users.likeCourse);
  router.post("/unlikeCourse", users.unlikeCourse);
  router.post("/checkLikeCourse", users.checkLikeCourse);
  router.post("/likePose", users.likePose);
  router.post("/unlikePose", users.unlikePose);
  router.post("/checkLikePose", users.checkLikePose);
  router.post("/likeMoment", users.likeMoment);
  router.post("/unlikeMoment", users.unlikeMoment);
  router.post("/checkLikeMoment", users.checkLikeMoment);
  router.post("/getMomentFollowLikeList", users.getMomentFollowLikeList);
  router.post("/globalSearch", users.globalSearch);

  app.use("/api/users", router);
};
