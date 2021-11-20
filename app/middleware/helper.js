const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../../config/logger.js");

class Helper {
  /**
   * @description this method is used to generate JWT Token
   * @param data->emailId, timelimit for the Token
   * @return token
   */
  generateToken = (emailId, firstName, timeLimit) => {
    let token = sign({ email: emailId , userName: firstName}, process.env.JWT_KEY, {
      expiresIn: timeLimit,
    });
    return !token ? null : token;
  };

  /**
   * @description this method is used to checkpassword
   * @param userPassword from body, encryptedPassword from Database
   * @return boolen value
   */
  checkPassword = (Userpassword, encryptedPass) => {
    return Userpassword && encryptedPass
      ? bcrypt.compareSync(Userpassword, encryptedPass)
      : false;
  };

  /**
   * @description CheckToken method is used to validate the Token before the execution of next
   * @param req from the user, res to server , next method
   */
  checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // console.log(token);
      if (token.includes("Bearer ")){
        token = token.slice(7);
      }
      // const decoded = jwt.verify(token, process.env.JWT_KEY);
      // console.log(decoded)
      // console.log(token);
      jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: "Invalid Token...or Expired",
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message:
          "Access Denied! Unauthorized User!! add Token and then Proceed ",
      });
    }
  };

  decodeJWT(token){
    if (token.includes("Bearer ")){
      token = token.slice(7);
    }
    return jwt.verify(token, process.env.JWT_KEY);
  }

}
module.exports = new Helper();
