'use strict';

module.exports = function(app) {
   var userHandlers = require('../controllers/userController.js');
   var Course = require('../controllers/course.js')
   var Medicine = require('../controllers/medicineController.js');
   app.route('/api/taomon').post(userHandlers.loginRequired,Course.createCourse);

   app.route('/api/read/:id').get(userHandlers.loginRequired,Course.readCoursebyID);

   app.route('/api/name').get(userHandlers.loginRequired,Course.searchByName);

   app.route('/api/delete/:id').delete(userHandlers.loginRequired,Course.deleteCoursebyID);

   app.route('/api/update/:id').put(userHandlers.loginRequired,Course.updateByID);

   app.route('/api/nhapthuoc').post(userHandlers.loginRequired,Medicine.createMedicine);

   app.route('/auth/register')
   	.post(userHandlers.register);

   app.route('/auth/sign_in')
   	.post(userHandlers.sign_in); 
};
