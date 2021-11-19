const joiValidator = require("../middleware/validation.js");
const employeeService = require("../services/client.js");
const logger = require("../../config/logger.js");

class Controll {
  /**
   * @description Create and save the new Client Data after validation
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  create = (req, res) => {
    // logger.info(req);
  //  console.log(req.body); 
    const employeeData = {
      emailId: req.body.emailId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      emergency_contact: req.body.emergency_contact,
      role: req.body.role,
      type: req.body.type,
      billing_amount: req.body.billing_amount,
      mobile: req.body.mobile,
      membership_startdate: req.body.membership_startdate,
      membership_enddate: req.body.membership_enddate,
      body_weight: req.body.body_weight,
      body_goal_type: req.body.body_goal_type,
      registeredby: req.body.registeredby,
      latestUpdated_by: req.body.latestUpdated_by,
    };
    const validationResult =
      joiValidator.joiEmployeeValidator.validate(employeeData);
    if (validationResult.error) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.details[0].message,
      });
    }
    employeeService.create(employeeData, (error, resultdata) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Error occured while creating Client",
          error: error.message,
        });
      }
      res.status(201).send({
        success: true,
        data: resultdata,
        message: "Client Data Inserted successfully",
      });
    });
  };

  /**
   * @description find all the Client Data
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  findAllClients = (req, res) => {
    try {
      employeeService.findAllEmployees((error, EmployeeData) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: "Some error occured while fetching Data",
          });
        }
        res.status(200).send({
          success: true,
          message: "Retrived all the Client data successfully",
          EmployeeData: EmployeeData,
        });
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: "Some error occured while fetching Data",
      });
    }
  };

  /**
   * @description find one the Client Data
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  findOneData = (req, res) => {
    const employeObjectId = req.params.employeeId;
    employeeService.findDataId(employeObjectId, (error, userData) => {
      if (error) {
        logger.error("Client not found with id " + employeObjectId);
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Client not found with id " + employeObjectId,
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error retrieving Client with id " + employeObjectId,
        });
      }
      if (userData)
        res.send({
          success: true,
          foundData: userData,
        });
      else {
        return res.status(404).send({
          success: false,
          message: "Client not found with id " + req.params.employeeId,
        });
      }
    });
  };

  /**
   * @description find one the Client Data and Delete
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  delete = (req, res) => {
    const employeObjectId = req.params.employeeId;
    employeeService.deleteDataUsingId(employeObjectId, (error) => {
      if (error) {
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Client not found with id " + employeObjectId,
          });
        }
        return res.status(500).send({
          success: false,
          message: error + " " + employeObjectId,
        });
      }
      res.send({
        success: true,
        message: "Client deleted successfully!",
      });
    });
  };

  /**
   * @description update Client Data by using Id after the data validation
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  update = (req, res) => {
    console.log(req.body);
    const employeeData = {
      emailId: req.body.emailId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      emergency_contact: req.body.emergency_contact,
      role: req.body.role,
      type: req.body.type,
      billing_amount: req.body.billing_amount,
      mobile: req.body.mobile,
      membership_startdate: req.body.membership_startdate,
      membership_enddate: req.body.membership_enddate,
      body_weight: req.body.body_weight,
      body_goal_type: req.body.body_goal_type,
      registeredby: req.body.registeredby,
      latestUpdated_by: req.body.latestUpdated_by,
    };
    const validationResult =
      joiValidator.joiEmployeeValidator.validate(employeeData);
    if (validationResult.error) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.details[0].message,
      });
    }
    let existingUserId = req.params.employeeId;
    employeeService.updateByID(
      existingUserId,
      employeeData,
      (error, resultData) => {
        if (error) {
          if (error.kind === "ObjectId") {
            return res.status(404).send({
              success: false,
              message: "Client not found with id " + existingUserId,
            });
          }
          return res.status(500).send({
            success: false,
            message:
              "Error occured while updating employeeID with " + existingUserId,
          });
        }
        res.send({
          success: true,
          message: "Client Data updated successfully",
          UpdatedData: resultData,
        });
      }
    );
  };
}

module.exports = new Controll();
