require("../db");
const { User } = require("../models")
const { updateOnlineToTrue } = require("../socket");

class SignUpController {
    async insertUser(data) {
        data.profilePhotos = "admin4.jpg"
        const person = new User(data);
        try {
            const result = await person.save();
            updateOnlineToTrue(result._id);
            return result;
        } catch (error) {
            console.log(`Error on create person: ${error}`)
            throw error;
        }
    }
}

module.exports = new SignUpController();