const mongoose = require("mongoose");

/**
 * @description Create Schema model of Client Data with Schema level data valiadtion
 */
const ClientSchema = mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
    validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
  },
  firstName: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  lastName: { type: String, required: true, validate: /^[a-zA-Z ]{1,30}$/ },
  address: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  emergency_contact: { type: Number, required: true, validate: /^[0-9]{10,}$/ },
  role: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  type: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  billing_amount: { type: Number, required: true, validate: /^[0-9]{3,}$/ },
  address: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  mobile: { type: Number, required: true, unique: true, validate: /^[0-9]{10,}$/ },
  membership_startdate: { type: Date, required: true },
  membership_enddate: { type: Date, required: true },
  body_weight: { type: Number, required: true, validate: /^[0-9]{1,3}$/ },
  body_goal_type: { type: Number, required: true, validate: /^[0-9]{1,3}$/ },
  registeredby: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  latestUpdated_by: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]{3,30}$/,
  },
  timestamps: false,
  versionKey: false,
});

const Client = mongoose.model("Client", ClientSchema);

class RegisterModel {
  /**
   * @description Create method is to save the new Client Data
   * @param userdData is data sent from Services
   * @return callback is used to callback Services includes error message or data
   */
  create = (userdata, callback) => {
    const client = new Client({
      emailId: userdata.emailId,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      address: userdata.address,
      emergency_contact: userdata.emergency_contact,
      role: userdata.role,
      type: userdata.type,
      billing_amount: userdata.billing_amount,
      address: userdata.address,
      mobile: userdata.mobile,
      membership_startdate: userdata.membership_startdate,
      membership_enddate: userdata.membership_enddate,
      body_weight: userdata.body_weight,
      body_goal_type: userdata.body_goal_type,
      registeredby: userdata.registeredby,
      latestUpdated_by: userdata.latestUpdated_by,
    });
    client.save({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /**
   * @description retrive all the client Data from MongoDB
   * @param callback is data sent from Services
   * @return callback is used to callback Services with data or error message
   */
  findAllClients = (callback) => {
    Client.find({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /**
   * @description retrive all the Client Data from MongoDB
   * @param objectId, callback is data sent from Services
   * @return callback is used to callback Services with data or error message
   */
  findDataId = (clientObjectId, callback) => {
    Client.findById(clientObjectId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /**
   * @description delete the Client Data from MongoDB
   * @param objectId, callback is data sent from Services
   * @return callback is used to callback Services with or without error message
   */
  deleteDataUsingId = (clientObjectId, callback) => {
    Client.findByIdAndDelete(clientObjectId, (error, data) => {
      if (!data && !error) {
        error = "no ClientDataFound with ObjectId";
      }
      return error ? callback(error) : callback(null);
    });
  };

  /**
   * @description Update the Registration_Data by Id
   * @param oldregistration_Id, New_UserData and callback
   * @return callback is used to callback Services with data or error message
   */
  updateById = (userId, userdata, callback) => {
    Client.findByIdAndUpdate(
      userId,
      {
        emailId: userdata.emailId,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        address: userdata.address,
        emergency_contact: userdata.emergency_contact,
        role: userdata.role,
        type: userdata.type,
        billing_amount: userdata.billing_amount,
        mobile: userdata.mobile,
        membership_startdate: userdata.membership_startdate,
        membership_enddate: userdata.membership_enddate,
        body_weight: userdata.body_weight,
        body_goal_type: userdata.body_goal_type,
        registeredby: userdata.registeredby,
        latestUpdated_by: userdata.latestUpdated_by,
      },
      { new: true },
      (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      }
    );
  };

      /**
    * @description Get the data by emailID
    * @param loginData having emailId and password
    * @return callback is used to callback Services with data or error message
    */
       checkClientData = (attendanceData, callback) => {
        Client.findOne({ "mobile": attendanceData.mobile}, (error, data) => {
            if (error) {
                return callback(error, null)
            }
            return (!data) ? callback("clientdata doesn't exist", null) : callback(null, data);
        })
    }
}

module.exports = new RegisterModel();
