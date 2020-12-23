var mongoose = require('mongoose');
Medicine = mongoose.model('Medicine');

const loi = {
    success: false,
    message: 'Loi he thong',
}
exports.createMedicine = function(req,res){
    const medicine = new Medicine({
        _id: mongoose.Types.ObjectId(),
        tenthuoc: req.body.tenthuoc,
        mota: req.body.mota,
        giathuocnhap: req.body.giathuocnhap,
        giathuocban: req.body.giathuocban,
        donvinhap: req.body.donvinhap,
        nhasanxuat: req.body.nhasanxuat,
        soluong: req.body.soluong,
        danhmuc: req.body.danhmuc,
    });
    return medicine.save().then((newMedicine) => {
        return res.status(201).json({
            success: true,
            message: 'Đã nhập hàng thành công',
            Medicine: newMedicine,
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Nhập hàng thất bạị vui lòng thử lại',
            err: error.message,
        });
    });
}
exports.searchByName = function(req,res){
    let skipCount = req.body.skipCount;
    let page = req.body.pageSize
    Medicine.find({tenthuoc: { $regex: '.*' + req.body.name + '.*'}}).skip(skipCount).limit(page).then((allMedicine) => {
        Medicine.countDocuments((err,count) => {
            if(allMedicine.length){
              res.status(200).json({
                success: true,
                message: 'Thong tin nguoi dung:',
                Totalcount: count,
                Medicine: allMedicine
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
exports.searchManu = function(req,res){
    let skipCount = req.body.skipCount;
    let page = req.body.pageSize
    Medicine.find({hangthuoc: { $regex: '.*' + req.body.name + '.*'}}).skip(skipCount).limit(page).then((allMedicine) => {
        Medicine.countDocuments((err,count) => {
            if(allMedicine.length){
              res.status(200).json({
                success: true,
                message: 'Thong tin nguoi dung:',
                Totalcount: count,
                Medicine: allMedicine
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
exports.search = function(req,res){
  
}
exports.readAllMedicine = function(req,res){
    let skipCount = req.body.skipCount;
    let pageSize = req.body.pageSize
    Medicine.find().skip(skipCount).limit(pageSize).exec((err,allMedicine) =>{
        Medicine.countDocuments((err,count) => {
        if(allMedicine.length){
          res.status(200).json({
            success: true,
            message: 'Danh sách thuốc:',
            Totalcount: count,
            Medicine: allMedicine
          });
        }
        else{
          res.status(403).json({
            success: false,
            message: 'Khong có sản phẩm nào:',
          });
        } 
      });
    });
  }
  exports.deleteMedicinebyID = function(req,res){
    const id = req.params.id;
    Medicine.findByIdAndRemove(id).then((dlMedicine) => {
      res.status(200).json({
        success: true,
        message: 'Nguoi dung co id la'+id+' da bi xoa :',
        Medicine: dlMedicine,
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
  const update = {
    tenthuoc: req.body.tenthuoc,
    mota: req.body.mota,
    giathuocnhap: req.body.giathuocnhap,
    giathuocban: req.body.giathuocban,
    donvinhap: req.body.donvinhap,
    nhasanxuat: req.body.nhasanxuat,
    danhmuc: req.body.danhmuc,
  }
  Medicine.update({_id:id}, { $set:update}).exec().then(()=>{
    Medicine.findOne({ '_id': req.params.id }, (err, med) => {
        med.soluong += req.body.soluong;
        med.save();
    res.status(200).json({
      success: true,
      message: 'Nguoi dung co id la '+id+'da duoc cap nhat:',
      updateMedicine: med,
    });
});
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong the update nguoidung',
      err: error.message,
    })
  });
}