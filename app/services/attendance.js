const clientModel = require('../models/client.js');
const attendanceModel = require('../models/attendance.js');
const { genSaltSync, hashSync } = require("bcrypt");
const helper = require('../middleware/helper.js');
const { Error } = require('mongoose');

class RegisterService {

    /**
    * @description Create method of Model is called to save the new Employee Data, Which also encrypts the password
    * @param userdData is data sent from Controller
    * @return callback is used to callback Controller
    */
    create = (userData, callback) => {
        attendanceModel.create(userData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })

    }
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
    }

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
            return (error) ? callback(error, null) : callback(null, data);
        })
    }

    /**
   * @description checkLogindetails used to validate the username and password
   * @param loginData having emailId and password
   * @return callback is used to callback controller with JsonWebToken or error message
   */
    checkLoginDetails = (credentials, callback) => {
        clientModel.checkClientData(credentials, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            if(data){           
                if (data.membership < currentdate) {   
                        clientData  = {
                        clientId: data.Id,
                        emailId: data.emailId,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        role: data.role,
                        type: data.type,
                        mobile: data.mobile,
                        membership_startdate: data.membership_startdate,
                        membership_enddate: data.membership_enddate,
                        status: "expired"
                            }      
                            return callback(error, clientData);                             
                    }
                    else{
                        clientData  = {
                            clientId: data.Id,
                            emailId: data.emailId,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            role: data.role,
                            type: data.type,
                            mobile: data.mobile,
                            membership_startdate: data.membership_startdate,
                            membership_enddate: data.membership_enddate,
                            status: "active"
                            }
                            return callback(error, clientData); 
                    }}
            return callback("Invalid Mobile Number", null);
        });
    }

module.exports = new RegisterService();
