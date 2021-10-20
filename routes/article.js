const express = require("express");
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const article = require("../controller/article");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("photo"), article.createOne);
router.get("/all", article.getItems);
router.get("/:id", article.getItem);
router.put("/:id", upload.single("photo"), article.updateOne);
router.delete("/:id", article.deleteOne);

module.exports = router;
 