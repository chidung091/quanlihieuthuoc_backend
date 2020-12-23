var mongoose = require('mongoose');
Bill = mongoose.model('Bill');
Medicine = mongoose.model('Medicine');

exports.createBill = function(req,res){

    const bill = new Bill({
        _id: mongoose.Types.ObjectId(),
        loaihd: req.body.loaihd,
        sanpham: req.body.sanpham,
        idnv: req.body.idnv,
        thoigianhd: req.body.thoigianhd,
    });
    return bill.save().then((newBill) => {
      newBill.sanpham.map((event) => {
        Medicine.findOne({ '_id': event._id }, (err, med) => {
          med.soluong -= event.soluong;
          med.save();
          return event;
      });
    });
    Bill.aggregate({})
        return res.status(201).json({
            success: true,
            message: 'Đã tao hoa don thành công',
            Bill: newBill,
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Tao hoa don that bai',
            err: error.message,
        });
    });
}
exports.showBill = function(req,res){
  let skipCount = req.body.skipCount;
  let pageSize = req.body.pageSize
    Bill.find().skip(skipCount).limit(pageSize).exec((error,Billinfo) =>{
      Bill.countDocuments((err,count) => {
        if (err) return res.status(404).json({
            success: false,
            message: 'Không tìm thấy hóa đơn phù hợp!',
            error: err.message,
        });
          res.status(200).json({
            success: true,
            message: 'Danh sách người dùng là:',
            Totalpages: count,
            Billinfo: Billinfo,
          });
      });
    });
}
exports.searchByName = function(req,res){
    let perPage = 10;
    let page = req.params.pa || 1;
    Bill.find({loaihd: { $regex: '.*' + req.body.name + '.*'}}).skip(perPage*page).limit(perPage).then((allNameinfo)=>{
      if(allNameinfo.length){
        res.status(200).json({
          success: true,
          message: 'Thong tin loai hoa don'+name+' la:',
          Billinfo: allNameinfo
        });
      }
      else{
        res.status(403).json({
          success: false,
          message: 'Khong tim thay hoa don nao co ten la:',
          name: req.body.name,
        });
      } 
    }).catch(function(error){
      res.status(500).json({
        success: false,
        message: 'Thong tin nguoi dung khong ton tai ban yeu a:',
        err: error.message,
      });
    });
  }
