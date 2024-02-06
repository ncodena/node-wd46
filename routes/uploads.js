import express from 'express';
import { uploadProfile, uploadCats } from '../utils/upload.js';
import { profilePictureUpload, catPicturesUpload, getImagesUploaded } from '../controllers/uploadControllers.js';

const uploadRouter = express.Router();

uploadRouter.post('/profile-pic', uploadProfile.single('profile_pic'), profilePictureUpload);
uploadRouter.post('/cat-pics', uploadCats.array('cat_pics'), catPicturesUpload);
uploadRouter.get('/get-pics', getImagesUploaded);
export default uploadRouter;