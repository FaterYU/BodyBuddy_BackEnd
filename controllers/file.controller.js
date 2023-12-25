const uploadFile = require("../middleware/upload");
const fs = require("fs");
const { compressorImage } = require("../middleware/imageCompressor");

function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}
function mkdirPath(Path) {
  try {
    if (!fs.existsSync(Path)) {
      fs.mkdirSync(Path);
    }
  } catch (err) {
    console.error(err);
  }
}
const upload = async (req, res) => {
  try {
    // console.log(req.body)
    await uploadFile(req, res);
    // console.log(req.body)
    // unitPath = [req.body.uploader, req.body.type];
    // console.log(unitPath)
    // mkdirPath(__basedir + "/uploads/");
    // const srcPath = __basedir + "\\uploads\\originfiles\\";
    // var distPath = __basedir + "\\uploads\\clearfiles\\";
    // mkdirPath(srcPath);
    // mkdirPath(distPath);
    // for (let i = 0; i < unitPath.length; i++) {
    //   distPath = distPath + unitPath[i] + "\\";
    //   mkdirPath(distPath);
    // }
    // copyFile(srcPath + req.file.originalname, distPath + req.file.originalname);
    if (req.file == undefined) {
      return res.status(400).send({ message: "请选择要上传的文件" });
    }
    res.status(200).send({
      message: req.file.originalname,
    });
    // compress and save file to /uploads with rename
    // compressorImage(req.file, "file", 0.5).then((result) => {
    //   fs.writeFileSync(
    //     __basedir + "/uploads/" + "compress" + req.file.originalname,
    //     result
    //   );
    // });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      message: "无法上传文件: " + req.file.originalname + ",错误为: " + err,
    });
  }
};
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "没有找到文件。",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: directoryPath + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  const fileName = req.query.name;
  //   const fileUploader = req.body.uploader;
  //   const fileType = req.body.type;
  const directoryPath = __basedir + "/uploads/";
  // res.download(directoryPath + fileName, fileName, (err) => {
  //   // if (err) {
  //   //   res.status(500).send({
  //   //     message: "无法获取文件。" + err,
  //   //   });
  //   // }

  // });
  res.sendFile(directoryPath + fileName);
};
module.exports = {
  upload,
  getListFiles,
  download,
};
