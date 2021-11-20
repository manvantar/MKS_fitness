const clientModel = require("../models/client.js");
const attendanceModel = require("../models/attendance.js");
const { genSaltSync, hashSync } = require("bcrypt");
const helper = require("../middleware/helper.js");
const { Error } = require("mongoose");
var moment = require("moment");

class RegisterService {
  /**
   * @description Create method of Model is called to save the new Employee Data, Which also encrypts the password
   * @param userdData is data sent from Controller
   * @return callback is used to callback Controller
   */
  create = (userData, callback) => {
    checkLoginDetails(userData, (error, data) => {
      if (error) {
        return callback(error, null);
      } else if (data) {
        attendanceModel.create(data, (error, modeldata) => {
          if (error) {
            return callback(error, null);
          } else if (modeldata) {
            const finaldata = {
              _id: modeldata.id,
              emailId: modeldata.emailId,
              firstName: modeldata.firstName,
              lastName: modeldata.lastName,
              role: modeldata.role,
              mobile: modeldata.mobile,
              status: modeldata.membership_status,
              check_in: data.check_in,
              client_id: modeldata.client_id,
              validity_in_days: data.validity,
              membership_startdate: modeldata.membership_startdate,
              membership_enddate: modeldata.membership_enddate,
            };
            console.log(finaldata);
            return callback(null, finaldata);
          }
        });
      }
      return callback(error, null);
    });
  };
  // checkLoginDetails=(userData,(error, data)=>{
  //     if(data.status==="Active" || data.status==="active"){
  //         clientModel.create(data, (error, data) => {
  //         return (error) ? callback(error, null) : callback(null, data);
  //     }
  //     else if(data.status==="expired" || data.status==="Expired"){
  //         clientModel.create(data, (error, data) => {
  //         return (error) ? callback(error, null) : callback(null, data);
  //     }
  // })
  // })

  // /**
  // * @description retrive all the Employee Data
  // * @param callback is data sent from Controller
  // * @return callback is used to callback Controller with data or error message
  // */
  // findAllEmployees = (callback) => {
  //     clientModel.findAllEmployees((error, data) => {
  //         return (error) ? callback(error, null) : callback(null, data);
  //     });
  // }

  // /**
  // * @description retrive Employee Data
  // * @param objectId and callback is data sent from Controller
  // * @return callback is used to callback Controller with data or error message
  // */
  // findDataId = (employeObjectId, callback) => {
  //     clientModel.findDataId(employeObjectId, (error, data) => {
  //         return (error) ? callback(error, null) : callback(null, data);
  //     });
  // }

  // /**
  // * @description delete Employee Data
  // * @param userdDataId and callback is data sent from Controller
  // * @return callback is used to callback Controller with or  without error message
  // */
  // deleteDataUsingId = (userDataId, callback) => {
  //     clientModel.deleteDataUsingId(userDataId, error => {
  //         return (error) ? callback(error) : callback(null);
  //     });
  // }

  /**
   * @description Create method of Model is called to save the new Employee Data  Which also encrypts the password
   * @param userdData is data sent from Controller
   * @return callback is used to callback Controller
   */
  updateByID = (userId, newUserData, callback) => {
    clientModel.updateById(userId, newUserData, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };
}
  /**
   * @description checkLogindetails used to validate the username and password
   * @param loginData having emailId and password
   * @return callback is used to callback controller with JsonWebToken or error message
   */
  checkLoginDetails = (credentials, callback) => {
    console.log("input ", credentials);
    clientModel.checkClientData(credentials, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (data) {
        var currentTime = new Date();
        var ISTOffset = 330;
        var ISTTime = new Date(currentTime.getTime() + ISTOffset * 60000);

        const membershipDate = new Date(data.membership_enddate);
        var Difference_In_Time = membershipDate.getTime() - ISTTime.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Math.floor(
          Difference_In_Time / (1000 * 3600 * 24)
        );

        // console.log("Membership days", Difference_In_Time / (1000 * 3600 * 24));
        if (Difference_In_Days > 0) {
          clientData = {
            clientId: data.id,
            emailId: data.emailId,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            type: data.type,
            mobile: data.mobile,
            membership_startdate: data.membership_startdate,
            membership_enddate: data.membership_enddate,
            status: "active",
            check_in: ISTTime,
            validity: Difference_In_Days + " days",
          };
          return callback(error, clientData);
        } else {
          clientData = {
            clientId: data.id,
            emailId: data.emailId,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            type: data.type,
            mobile: data.mobile,
            membership_startdate: data.membership_startdate,
            membership_enddate: data.membership_enddate,
            status: "expire",
            check_in: ISTTime,
            validity: "0 days",
          };
          return callback(error, clientData);
        }
      }
      return callback("Invalid Mobile Number", null);
    });
  };

module.exports = new RegisterService();
