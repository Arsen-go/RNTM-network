const signUpController = require("../controller/signup-controller");
const schema = require("../validate/joi");

class SignUpRouter {
    async addUser(req, res) {
        console.log(req.body)
        if (schema.validate(req.body).error) {
            console.log("valid error")
            res.json({error:schema.validate(req.body).error.message});
        } else {
            let result = await signUpController.insertUser(req.body);
            res.json({result:true});
        }
    }
}

module.exports = new SignUpRouter();