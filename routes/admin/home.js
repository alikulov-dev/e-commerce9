const express = require("express");
const router = express.Router();
const {isAuth} = require('../../middleware/isAuth')
router.get("/", isAuth, (req, res) => {
  res.render("./admin/home", { layout: "adminLayout" });
});

router.get("/templates", (req, res) => {
  res.render("./admin/templates", { layout: "adminLayout" });
});

router.get("/add-theme", (req, res) => {
  res.render("./admin/add-theme", { layout: "adminLayout" });
});

  router.get("/login", (req, res) => {
  res.render("./admin/pages/login", { layout: "alternative" });
}); 


module.exports = router;
