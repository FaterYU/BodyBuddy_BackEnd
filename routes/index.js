var express = require("express");
var router = express.Router();
const controller = require("../controllers/file.controller");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var routes = (app) => {
  // router.get("/", home);
  router.post("/upload", controller.upload);
  // router.get("/api/fileslist", controller.getListFiles);
  router.post("/download", controller.download);
  app.use("/api/files", router);
};

function home(req, res) {
  res.render("index", { title: "Express" });
}

module.exports = routes;
