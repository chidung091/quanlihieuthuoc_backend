'use strict';

module.exports = function(app) {
   var userHandlers = require('../controllers/userController.js');
   var Userinfo = require('../controllers/Userinfocontroller.js')
   var Medicine = require('../controllers/medicineController.js');
   var Bill = require('../controllers/BillController.js');
   app.route('/api/taomon').post(userHandlers.loginRequired,Userinfo.createUserinfo);

   app.route('/api/read/:id').get(userHandlers.loginRequired,Userinfo.readUserinfobyID);

   app.route('/api/name').get(userHandlers.loginRequired,Userinfo.searchByName);

   app.route('/api/delete/:id').delete(userHandlers.loginRequired,Userinfo.deleteUserinfobyID);

   app.route('/api/update/:id').put(userHandlers.loginRequired,Userinfo.updateByID);

   app.route('/api/allUserinfo/:pa').get(userHandlers.loginRequired,Userinfo.readAllUserinfo);
   app.route('/api/nhapthuoc').post(userHandlers.loginRequired,Medicine.createMedicine);
   app.route('/api/timnsx/1').get(userHandlers.loginRequired,Medicine.searchbyManuName);
   app.route('/api/bill').post(userHandlers.loginRequired,Bill.createBill);
   app.route('/auth/register')
   	.post(userHandlers.register);

   app.route('/auth/sign_in')
   	.post(userHandlers.sign_in); 
};
