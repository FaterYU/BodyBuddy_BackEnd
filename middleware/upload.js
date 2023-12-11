const util = require("util");
const multer = require("multer");
const maxSize = 1 * 1024 * 1024 * 1024; //文件限制1GB
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now() + file.originalname;
    cb(null, file.originalname);
  },
});
// let storage = multer.memoryStorage()
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
