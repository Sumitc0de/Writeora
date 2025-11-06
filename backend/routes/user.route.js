const express  =  require('express');
const { registerUser, loginUser, logoutUser } =  require('../controllers/user.controller')
const protect =  require('../middlewares/authmiddleware')

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router
