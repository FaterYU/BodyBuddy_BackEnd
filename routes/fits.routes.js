module.exports = (app) => {
  const fits = require("../controllers/fits.controller.js");
  var router = require("express").Router();
  router.get("/findAll", fits.findAll);
  router.post("/create", fits.create);
  router.post("/getOneFitById", fits.getOneFitById);
  router.post("/findListByUserId", fits.findListByUserId);
  router.delete("/deleteByFitsId", fits.deleteByFitsId);
  router.put("/setVideoByPoseIdx", fits.setVideoByPoseIdx);
  router.post("/getOneFitScoreById", fits.getOneFitScoreById);
  router.post("/getScore", fits.getScore);
  router.post("/getLongTimeData", fits.getLongTimeData);
  app.use("/api/fits", router);
};
