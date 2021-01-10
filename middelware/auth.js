const jwt = require('jsonwebtoken');

// exports.verify = (req, res, next) => {
//     console.log(req)
//     console.log(":");
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401) // if there isn't any token
  
//     jwt.verify(token, "esim", (err) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next() 
//     })
//   }

verifyToken = (req, res, next) => {
  //console.log(req.headers)
    let token = req.cookies["x-access-token"];
    
  
    if (!token) {
      res.redirect('/login')
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, "esim", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userObj = decoded;
  
      next();
    });
  };
  module.exports = {
    verifyToken
  }