const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");  // local multer
const { uploadImage } = require("../controllers/upload.controller");

const protect = require("../middlewares/authmiddleware");
const adminProtect = require("../middlewares/adminMiddleware");
const { uploadPdf } = require("../controllers/uploadPdf.controller");

router.post("/", protect, upload.single("image"), uploadImage);
router.post("/pdf", protect, adminProtect, upload.single("pdf"), uploadPdf);

module.exports = router;
