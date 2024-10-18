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

            if (profilePictureUrl) {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    resource_type: 'auto',
                });
                profilePictureUrl = uploadResponse.secure_url;
                console.log('Image uploaded successfully:', profilePictureUrl);
            }

            if (jobType) {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    resource_type: 'auto',
                });
                jobType = uploadResponse.secure_url;
                console.log('Image uploaded successfully:', jobType);
            }


            const application = new Application({
                ...req.body,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePictureUrl: profilePictureUrl,
                jobType: jobType,
            });

        await application.save();

        user.role = 'Writer';

        console.log({ message: 'Application submitted successfully.', application });
        return res.status(201).json({ message: 'Application submitted successfully.', application });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


