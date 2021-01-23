const User = require('../models/user-schema');

class ImageRouter {
    async changeProfileImage(req, res) {
        let userId = req.body.userId
        const file = req.file.filename
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return (error)
        }
        let user = await findUser(userId)
        user.profilePhotos = file;
        await user.save();
        res.json({ imageName: file });
    }

    async getProfileImage(req, res) {
        try {
            let result = await User.findById(req.body.userId).select({ profilePhotos: 1, name: 1 });
            res.json({ imageName: result.profilePhotos, userName: result.name })
        } catch (err) {
            throw new Error("Error on profile photo");
        }
    }

}

async function findUser(userId) {
    return await User.findOne({ _id: userId }).select({ name: 1, photo: 1, message: 1, friendRequest: 1 });
}

module.exports = new ImageRouter();