const express = require("express");
const router = express.Router();
const learnController = require("../controllers/learn.controller");
const protect = require("../middlewares/authmiddleware");
const adminProtect = require("../middlewares/adminMiddleware");

// ✅ Public Routes
router.get("/modules", learnController.getAllModules);
router.get("/modules/:slug", learnController.getModuleBySlug);
router.get("/modules/:moduleSlug/lessons/:lessonSlug", learnController.getLesson);

// 🛡️ Admin Routes
router.post("/modules", protect, adminProtect, learnController.createModule);
router.put("/modules/:id", protect, adminProtect, learnController.updateModule);
router.delete("/modules/:id", protect, adminProtect, learnController.deleteModule);

router.post("/lessons", protect, adminProtect, learnController.createLesson);
router.put("/lessons/:id", protect, adminProtect, learnController.updateLesson);
router.delete("/lessons/:id", protect, adminProtect, learnController.deleteLesson);

module.exports = router;
