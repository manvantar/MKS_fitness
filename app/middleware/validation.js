const joi = require("@hapi/joi");

class Validation {
  joiEmployeeValidator = joi.object({
    firstName: joi.string().alphanum().min(3).max(30),
    lastName: joi.string().alphanum().min(2).max(30),
    emailId: joi.string().email().required(),
    mobile: joi.number().min(1000000000).required(),
    address: joi.string().alphanum().min(2).max(30),
    designation: joi.string().alphanum().min(2).max(30),
    billing_amount: joi.number().min(100).max(999999999),
    emergency_contact: joi.number().min(1000000000).required(),
    role: joi.string().alphanum().min(2).max(30),
    type: joi.string().alphanum().min(2).max(30),
    membership_startdate:  joi.date().required(),
    membership_enddate:  joi.date().required(),
    body_weight:  joi.number().min(30).max(200),
    body_goal_type: joi.number().min(30).max(200),
    registeredby: joi.string().alphanum().min(2).max(30),
    latestUpdated_by: joi.string().alphanum().min(2).max(30)
  });

  //valiadtes newUserdata
  joiUserValidator = joi.object({
    firstName: joi.string().alphanum().min(3).max(30),
    lastName: joi.string().alphanum().min(2).max(30),
    emailId: joi.string().email().required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  //validates Credentials
  joiCredentialsValidator = joi.object({
    emailId: joi.string().email().required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });
}
module.exports = new Validation();
