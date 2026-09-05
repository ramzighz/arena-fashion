import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { requireSeller } from '../middleware/seller.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|webp|avif|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files (jpg/png/webp/avif/gif) are allowed'));
  },
});

// POST /api/upload - Seller: upload product image to Cloudinary, returns { url }
router.post('/', requireSeller, upload.single('image'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image file received.' });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    return res.status(501).json({
      success: false,
      error: 'Image hosting not configured. Add CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET to server/.env, or paste an image URL instead.',
    });
  }

  try {
    const url = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'your-business-products', resource_type: 'image' },
        (err, result) => (err ? reject(err) : resolve(result.secure_url))
      );
      stream.end(req.file.buffer);
    });
    return res.json({ success: true, url });
  } catch (err) {
    return next(err);
  }
});

export default router;
