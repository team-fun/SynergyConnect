const express = require("express");
const router = express.Router();
const cloudinary = require("../cloudinary/cloudinaryConfig");
const multer = require("multer");

// 2 steps uploading an image

// 1. Multer uploads the image to our local folder (uploads)
// 2. Cloudinary package uploads it to cloudinary website by itself
const storage = multer.diskStorage({
	destination: "uploads/",
	filename: (req, file, cb) => {
		const originalName = file.originalname;
		const extension = originalName.substring(originalName.lastIndexOf("."));
		const filename =
			originalName.substring(0, originalName.lastIndexOf(".")) + extension;
		cb(null, filename);
	},
});
const upload = multer({ storage: storage });

// File upload route
router.post("/", upload.single("image"), async (req, res) => {
	// Access the uploaded file via req.file
	console.log(req.file);
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}
	try {
		// Upload the file to Cloudinary
		const result = await cloudinary.uploader.upload(req.file.path, {
			public_id: req.file.originalname.replace(/\.[^/.]+$/, ""), // Set the public_id to the original filename
		});

		// Create a new product record in MongoDB with the uploaded image URL
		console.log(result);

		// Send the response with the Cloudinary URL and filename
		res.json({ url: result.url, filename: req.file.originalname });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

module.exports = router;
