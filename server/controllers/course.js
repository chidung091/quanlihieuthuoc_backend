var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
Course = mongoose.model('Course');
// create new cause
exports.createCourse = function(req, res) {
    const course = new Course({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
    });
    
    return course
      .save()
      .then((newCourse) => {
        return res.status(201).json({
          success: true,
          message: 'New cause created successfully',
          Course: newCourse,
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
exports.readCoursebyID = function(req,res){
  const id = req.params.id;
  Course.findById(id).then((sgCourse) => {
    res.status(200).json({
      success: true,
      message: 'Thong tin cuon sach theo id la:',
      Course: sgCourse,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong tim thay thong tin cuon sach',
      err: error.message,
    });
  });
}
exports.readAllCourse = function(req,res){
  let perPage = 10;
  let page = req.params.pa || 1;
  Course.find().skip((perPage * page)- perPage).limit(perPage).exec((err,allCourse) =>{
    Course.countDocuments((err,count) => {
      if (err) return next(err);
        res.status(200).json({
          success: true,
          message: 'Tổng số cuốn sách là:',
          pagenow: page,
          totalpages: Math.ceil(count/10),
          Course: allCourse,
        });
    });
  });
}
exports.searchByName = function(req,res){
  Course.find({title: { $regex: '.*' + req.body.name + '.*'}}).then((allCourse)=>{
    if(allCourse.length){
      res.status(200).json({
        success: true,
        message: 'Thong tin cuon sach co ten la:',
        Course: allCourse
      });
    }
    else{
      res.status(404).json({

      });
    } 
  }).catch(function(error){
    res.status(500).json({
      success: false,
      message: 'Thong tin cuon sach khong ton tai ban yeu a:',
      err: error.message,
    });
  });
}
exports.deleteCoursebyID = function(req,res){
  const id = req.params.id;
  Course.findByIdAndRemove(id).then((dlCourse) => {
    res.status(200).json({
      success: true,
      message: 'Cuon sach co id la ${id} da bi xoa :',
      Course: dlCourse,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong tim thay thong tin cuon sach',
      err: error.message,
    });
  });
}
exports.updateByID = function(req,res){
  const id = req.params.id;
  const updateObject = req.body;
  Course.update({_id:id}, { $set:updateObject}).exec().then(()=>{
    res.status(200).json({
      success: true,
      message: 'Cuon sach co id la ${id} da duoc cap nhat:',
      updateCourse: updateObject,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong the update cuon sach',
      err: error.message,
    })
  });
}