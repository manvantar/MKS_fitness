const mongoose = require("mongoose");

/**
 * @description Create Schema model of Attendance Data with Schema level data valiadtion
 */
const AttendanceSchema = mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
  },
  firstName: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  lastName: { type: String, required: true, validate: /^[a-zA-Z ]{1,30}$/ },
  role: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
  mobile: { type: Number, required: true, validate: /^[0-9]{10,}$/ },
  membership_status: {type: String, required: true, validate: /^[a-zA-Z ]{1,50}$/},
  check_in: { type: Date, required: true },
  check_out: { type: Date },
  client_id: {type: String, required: true},
  timestamps: false,
  versionKey: false,
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

class RegisterModel {
  /**
   * @description Create method is to save the new Attendance Data
   * @param userdData is data sent from Services
   * @return callback is used to callback Services includes error message or data
   */
  create = (userdata, callback) => {
    const attendance = new Attendance({
      emailId: userdata.emailId,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      role: userdata.role,
      mobile: userdata.mobile,
      membership_status: userdata.membership_status,
      check_in: userdata.check_in,
      // check_out: userdata.check_out_time,
      client_id: userdata.client_id
    });
    attendance.save({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /**
   * @description retrive all the attendance Data from MongoDB
   * @param callback is data sent from Services
   * @return callback is used to callback Services with data or error message
   */
  findAllAttendances = (callback) => {
    Attendance.find({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

//   /**
//    * @description retrive all the Attendance Data from MongoDB
//    * @param objectId, callback is data sent from Services
//    * @return callback is used to callback Services with data or error message
//    */
//   findDataId = (attendanceObjectId, callback) => {
//     Attendance.findById(attendanceObjectId, (error, data) => {
//       return error ? callback(error, null) : callback(null, data);
//     });
//   };


  /**
   * @description Update the Registration_Data by Id
   * @param oldregistration_Id, New_UserData and callback
   * @return callback is used to callback Services with data or error message
   */
  updateById = (userId, userdata, callback) => {
    Attendance.findByIdAndUpdate(
      userId,
      {
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        role: userdata.role,
        mobile: userdata.mobile,
        membership_status: userdata.membership_status,
        check_in: userdata.check_in_time,
        check_out: userdata.check_out_time,
        client_id: userdata.client_id
      },
      { new: true },
      (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      }
    );
  };
}

module.exports = new RegisterModel();
