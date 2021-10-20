const express = require("express");
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const template = require("../controller/template");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("photo"), template.createOne);
router.get("/all", template.getItems);
router.get("/:id", template.getItem);
router.put("/:id", upload.single("photo"), template.updateOne);
router.delete("/:id", template.deleteOne);

module.exports = router;
 