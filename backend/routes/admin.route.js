const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    updateUserRole,
} = require("../controllers/admin.controller");
const protect = require("../middlewares/authmiddleware");
const adminProtect = require("../middlewares/adminMiddleware");

// All routes here are protected and admin-only
router.use(protect);
router.use(adminProtect);

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id/role", updateUserRole);

module.exports = router;
