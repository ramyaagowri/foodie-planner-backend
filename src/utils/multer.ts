import multer from "fastify-multer";
import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname + "../../files"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

const storage = multer.memoryStorage()

const upload = multer({
  storage,
});

export default upload;
