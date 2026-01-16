// Import cloudinary configuration
const cloudinary = require("../config/cloudinaryConfig");

// Export function to handle image uploads
exports.uploadImage = async (req, res) => {
  try {
    // Upload image to Cloudinary with specified folder
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "writeora_uploads",   // Custom folder name
    });

    // Send success response with image URL and public ID
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    // Log error to console
    console.error(error);
    // Send error response
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};