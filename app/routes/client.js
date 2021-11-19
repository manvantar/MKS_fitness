/* eslint-disable import/extensions */
const controllerClient = require('../controllers/client.js');
const helper = require('../middleware/helper.js');
const userController = require('../controllers/user.js');
const attendanceController = require('../controllers/attendance');

module.exports = (app) => {
  // create user with emailId and Password
  app.post('/registration', userController.create);

  // login user emailId and Password
  app.post('/login', userController.login);

  // Create a new client
  app.post('/add/client', helper.checkToken, controllerClient.create);

  // app.get('/clients', helper.checkToken, controllerclient.findAllClients);
  app.get('/clients', controllerClient.findAllClients);

  // Retrieve a single client with clientsId
  app.get(
    '/clients/:clientsId',
    helper.checkToken,
    controllerClient.findOneData
  );

  // Update a client with clientsId
  app.put('/update/client/:clientsId', controllerClient.update);

  // Delete a client with clientsId
  app.delete(
    '/delete/client/:clientsId',
    helper.checkToken,
    controllerClient.delete
  );

  app.post('/attendance', attendanceController.markAttendance);
};
