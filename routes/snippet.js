const express = require("express");
const router = express.Router();
const snippet = require("../controller/snippet");


router.post("/add", snippet.createOne);
router.get("/all", snippet.getItems);
router.get("/:id", snippet.getItem);
router.put("/:id",  snippet.updateOne);
router.delete("/:id", snippet.deleteOne);

module.exports = router;
 