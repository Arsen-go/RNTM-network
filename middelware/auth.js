//const jwt = require('jsonwebtoken');

exports.verify = function(req, res, next) {
    let accessToken = req.headers.xaccesstoken
    console.log(req.headers)
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
        return res.status(403).send()
    }
    next();
}