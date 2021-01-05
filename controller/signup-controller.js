require("../db");
const User = require("../models/user-schema")

class SignUpController {
    async insertUser(data) {
        const person = new User(data);
        console.log("sign",data)
        try {
            const result = await person.save();
            console.log("sign",result)
            return result;
        } catch (error) {
            console.log(`Error on create person: ${error}`)
            throw error;
        }
    }
}

module.exports = new SignUpController();