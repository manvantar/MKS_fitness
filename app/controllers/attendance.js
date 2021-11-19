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
        emailId: req.body.emailId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            mobile: req.body.mobile,
            membership_status: req.body.membership_status,
            check_in: req.body.check_in,
            check_out: req.body.check_out_time,
            client_id: req.body.client_id
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
            message: "Error occured while marking an attendance",
            error: error.message,
          });
        }
        res.status(201).send({
          success: true,
          data: resultdata,
          message: "Client attendance marked successfully",
        });
      });
    };
}

module.exports = new AttendanceControll();