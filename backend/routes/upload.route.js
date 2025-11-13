const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");  // local multer
const { uploadImage } = require("../controllers/upload.controller");

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
