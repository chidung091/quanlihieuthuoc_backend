var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
Userinfo = mongoose.model('Userinfo');
// create new cause
exports.createUserinfo = function(req, res) {
    const Userinfo = new Userinfo({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
    });
    
    return Userinfo
      .save()
      .then((newUserinfo) => {
        return res.status(201).json({
          success: true,
          message: 'New cause created successfully',
          Userinfo: newUserinfo,
        });
      })
      .catch((error) => {
          console.log(error);
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        });
      });
  }
exports.readUserinfobyID = function(req,res){
  const id = req.params.id;
  Userinfo.findById(id).then((infoUser) => {
    res.status(200).json({
      success: true,
      message: 'Thong tin nguoi dung theo id la:',
      id: id,
      Userinfo: infoUser,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong tim thay thong tin nguoi dung:',
      err: error.message,
    });
  });
}
exports.readAllUserinfo = function(req,res){
  let skipCount = req.body.skipCount;
  let page = req.body.pageSize
  Userinfo.find().skip(skipCount).limit(page).exec((err,allUserinfo) =>{
    Userinfo.countDocuments((err,count) => {
      if(allUserinfo.length){
        res.status(200).json({
          success: true,
          message: 'Thong tin nguoi dung:',
          Totalcount: count,
          Userinfo: allUserinfo
        });
      }
      else{
        res.status(403).json({
          success: false,
          message: 'Khong tim thay nguoi dung co ten la:',
          name: req.body.name,
        });
      } 
    });
  });
}
exports.searchByName = function(req,res){
  let skipCount = req.body.skipCount;
  let page = req.body.pageSize;
  Userinfo.find({fullName: { $regex: '.*' + req.body.name + '.*'}}).skip(skipCount).limit(page).then((allUserinfo)=>{
    console.log(allUserinfo.count);
    Userinfo.countDocuments((err,count) => {
    if(allUserinfo.length){
      res.status(200).json({
        success: true,
        message: 'Thong tin nguoi dung co ten la:',
        name: req.body.name,
        Totalcount: count,
        Userinfo: allUserinfo
      });
    }
    else{
      res.status(403).json({
        success: false,
        message: 'Khong tim thay nguoi dung co ten la:',
        name: req.body.name,
      });
    } 
  });
  }).catch(function(error){
    res.status(500).json({
      success: false,
      message: 'Thong tin nguoi dung khong ton tai ban yeu a:',
      err: error.message,
    });
  });
}
exports.deleteUserinfobyID = function(req,res){
  const id = req.params.id;
  Userinfo.findByIdAndRemove(id).then((dlUserinfo) => {
    res.status(200).json({
      success: true,
      message: 'Nguoi dung co id la'+id+' da bi xoa :',
      Userinfo: dlUserinfo,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong tim thay thong tin '+id+'can xoa',
      err: error.message,
    });
  });
}
exports.updateByID = function(req,res){
  const id = req.params.id;
  const updateObject = req.body;
  Userinfo.update({_id:id}, { $set:updateObject}).exec().then(()=>{
    res.status(200).json({
      success: true,
      message: 'Nguoi dung co id la '+id+'da duoc cap nhat:',
      updateUserinfo: updateObject,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong the update nguoidung',
      err: error.message,
    })
  });
}