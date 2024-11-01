import Application from "../models/apply.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const apply = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const email = await User.findOne({ email: req.user.email });
        if (!email) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingProfile = await Application.findOne({ email: req.user.email });
        if (existingProfile) {
            return res.status(400).json({ message: 'You already have a profile' });
        }

        let profilePictureUrl = "";
        let jobType = "";

        if (req.body.image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
                    resource_type: 'auto',
                });
                profilePictureUrl = uploadResponse.secure_url;
                console.log('Profile picture uploaded successfully:', profilePictureUrl);
            } catch (uploadError) {
                console.error('Profile picture upload failed:', uploadError);
                return res.status(500).json({ message: 'Profile picture upload failed' });
            }
        }

        if (req.body.jobImage) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(req.body.jobImage, {
                    resource_type: 'auto',
                });
                jobType = uploadResponse.secure_url;
                console.log('Job type image uploaded successfully:', jobType);
            } catch (uploadError) {
                console.error('Job type image upload failed:', uploadError);
                return res.status(500).json({ message: 'Job type image upload failed' });
            }
        }

        const application = new Application({
            ...req.body,
            profilePictureUrl,
            jobType,
        });

        await application.save();

        user.role = 'Writer';

        user.email = application.email

        console.log('Application submitted successfully:', application);
        return res.status(201).json({
            message: `Your login email is now ${application.email}. Application submitted successfully.`,
            application,
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


