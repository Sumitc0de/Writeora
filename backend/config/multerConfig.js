// Importing the multer module for file upload
const multer = require("multer");

// Configure disk storage for multer
// Specifies where files will be stored and their naming convention
const storage = multer.diskStorage({});
const upload = multer({ storage });

module.exports = upload;
