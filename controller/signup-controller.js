require("../db");
const User = require("../models/user-schema")

class SignUpController {
    async insertUser(data) {
        data.profilePhotos = "admin4.jpg"
        const person = new User(data);       
        try {
            const result = await person.save();
            return result;
        } catch (error) {
            console.log(`Error on create person: ${error}`)
            throw error;
        }
    }
}

module.exports = new SignUpController();