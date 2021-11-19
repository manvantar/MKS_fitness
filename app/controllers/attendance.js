const attendanceService = require("../services/attendance.js");

class AttendanceControll {
  /**
   * @description Create and save the new Client Data after validation
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  markAttendance = (req, res) => {
    // logger.info(req);
    //  console.log(req.body);
    const attendanceData = {
      mobile: req.body.mobile,
    };
    //   const validationResult =
    //     joiValidator.joiEmployeeValidator.validate(employeeData);
    //   if (validationResult.error) {
    //     return res.status(400).send({
    //       success: false,
    //       message: validationResult.error.details[0].message,
    //     });
    //   }
    attendanceService.create(attendanceData, (error, resultdata) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: error,
          error: error.message,
        });
      }
      if (resultdata) {
        if (resultdata.status === "active") {
          res.status(201).send({
            success: true,
            data: resultdata,
            message: "Attendance marked successfully",
            notification: "",
          });
        } else {
          res.status(201).send({
            success: true,
            data: resultdata,
            message: "Attendance marked successfully",
            notification: "Your MemberShip has expired, Please renew it",
          });
        }
      }
    });
  };
}

module.exports = new AttendanceControll();
