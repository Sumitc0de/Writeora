const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No PDF file provided" });
        }

        // Check if file is PDF (Multer file filter should handle this, but double checking)
        if (req.file.mimetype !== "application/pdf") {
            fs.unlinkSync(req.file.path); // Remove local file
            return res.status(400).json({ message: "Only PDF files are allowed" });
        }

        // Upload to Cloudinary (as raw file)
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "writeora/pdfs",
            use_filename: true,
            unique_filename: true,
        });

        // Remove file from local server
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: "PDF uploaded successfully",
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error("PDF Upload Error:", error);
        res.status(500).json({ message: "Error uploading PDF", error: error.message });
    }
};
