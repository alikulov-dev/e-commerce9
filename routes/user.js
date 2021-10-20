const express = require("express");
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const user = require("../controller/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("photo"), user.createOne);
router.get("/all", user.getAll);
router.get("/:id", user.getOne);
router.put("/:id", upload.single("photo"), user.updateOne);
router.delete("/:id", user.deleteOne);
router.post('/login', user.login) 
router.get('/logout', user.logout)
router.get('/me', user.getMe)

module.exports = router;
 