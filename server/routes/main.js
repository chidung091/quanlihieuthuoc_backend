'use strict';

module.exports = function(app) {
   var userHandlers = require('../controllers/userController.js');
   var Userinfo = require('../controllers/Userinfocontroller.js')
   var Medicine = require('../controllers/medicineController.js');
   var Bill = require('../controllers/BillController.js');
   app.route('/api/taomon').post(userHandlers.loginRequired,Userinfo.createUserinfo);

   app.route('/api/user/:id').get(userHandlers.loginRequired,Userinfo.readUserinfobyID);

   app.route('/api/user/search/name').post(userHandlers.loginRequired,Userinfo.searchByName);

   app.route('/api/user/delete/:id').delete(userHandlers.loginRequired,Userinfo.deleteUserinfobyID);

   app.route('/api/user/update/:id').put(userHandlers.loginRequired,Userinfo.updateByID);

   app.route('/api/user/all').post(userHandlers.loginRequired,Userinfo.readAllUserinfo);
   app.route('/api/medicine/create').post(userHandlers.loginRequired,Medicine.createMedicine);
   app.route('/api/medicine/search/manu').post(userHandlers.loginRequired,Medicine.searchManu);
   app.route('/api/medicine/search/name').post(userHandlers.loginRequired,Medicine.searchByName);
   app.route('/api/medicine/delete/:id').delete(userHandlers.loginRequired,Medicine.deleteMedicinebyID);
   app.route('/api/medicine/all').post(userHandlers.loginRequired,Medicine.readAllMedicine);
   app.route('/api/medicine/getall').get(userHandlers.loginRequired,Medicine.getAllMedicine);
   app.route('/api/medicine/update/:id').put(userHandlers.loginRequired,Medicine.updateByID);
   
   app.route('/api/bill').post(userHandlers.loginRequired,Bill.createBill);
   app.route('/api/bill/show/:id').get(userHandlers.loginRequired,Bill.BillInfoID);
   app.route('/api/bill/showall').post(userHandlers.loginRequired,Bill.showBill);
   app.route('/api/bill/search/date').post(Bill.showBillperDate);
   app.route('/api/thongke/nv').post(userHandlers.loginRequired,Bill.thongkehdbynv);
   app.route('/api/thongke/nvds').post(userHandlers.loginRequired,Bill.thongkedoanhthu);
   app.route('/api/thongke/doanhso').post(userHandlers.loginRequired,Bill.thongkedoanhthucuahang);
   app.route('/api/thongke/spcuadoanhso').post(userHandlers.loginRequired,Bill.thongkecuahang)
   app.route('/api/getloaihd').post(Bill.getloaihd);
   app.route('/api/user/register').post(userHandlers.loginRequired,userHandlers.registerUser);
   app.route('/auth/register/admin')
   	.post(userHandlers.register);

   app.route('/auth/sign_in')
   	.post(userHandlers.sign_in); 
};
