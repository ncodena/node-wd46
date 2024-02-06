import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File filter for images
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

export const uploadProfile = multer({ storage: storage, fileFilter: imageFilter });
export const uploadCats = multer({ storage: storage, fileFilter: imageFilter });