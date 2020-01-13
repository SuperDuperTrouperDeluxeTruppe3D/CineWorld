
const jwt = require('jsonwebtoken');
/*

const jwt = require("jsonwebtoken");
/!**
 * use this middleware to protect some functionalities
 * eg. booking only for logedin users
 *!/
module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if (!authHeader){
        req.isAuth.js = false; // name up to you, just flag
        return next(); // other code will continue
    }
    const token = authHeader.split(' ')[1]; // Authorization  bearer "token value"
    // split at space, between bearer and token and theis is token
    if (!token || token == ''){
        req.isAuth.js = false;
        return next();
    }
    let decodedToken;
    try { // we have auth & token-> verfiy
        decodedToken = jwt.verify(token, 'somesuperuserkey');
    } catch (err) {
        req.isAuth.js = false;
        return next();
    }
    // pass the try -> verfy if decodedToken is there
    if (!decodedToken){
        req.isAuth.js = false;
        return next();
    }
    // pass all the tests-> we have a token
    req.isAuth.js = true;
    req.userId = decodedToken.userId;
    next();
};
*/



module.exports =   (req, res, next) => {
    const authHeader =  req.get('Authorization');
    console.log(req.access_token);
    //const authHeader = req.headers.authorization;

    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
   console.log(token);
   const secret = "somesupersecretkey";
    decodedToken = function (token, secret ) {
        try {
           return jwt.verify(token, secret);
           // return true
        } catch(err) {
            req.isAuth = false;
            return next();
        }
    };

    if (!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
   /* try {
        console.log("token: ", authHeader);
        decodedToken =  jwt.verify(token, "somesupersecretkey").then(value => console.log("decoded synch: ", decodedToken));
    } catch (err) {
        req.isAuth.js = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth.js = false;
        return next();
    }
    req.isAuth.js = true;
    req.userId = decodedToken.userId;
    next();*/
};