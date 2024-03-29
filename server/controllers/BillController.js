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
        tongtien: 0,
    });
    return bill.save().then((newBill) => {
      newBill.sanpham.map((event) => {
        Medicine.findOne({ '_id': event._id }, (err, med) => {
          med.soluong -= event.soluong;
          med.save();
          return event;
      });
    });
    Bill.aggregate(
      [{
          $match:{"_id": newBill._id}},
          {$unwind: '$sanpham'},
          {$group: {
              "_id": "$_id",
              "tongtien": { $sum: "$sanpham.tongtiensp" }
      }},  
    ]).exec((err,save) => {
      console.log(save[0].tongtien);
      const update = ({
        tongtien: save[0].tongtien
      })
      Bill.update({_id:newBill.id}, { $set:update}).exec().then((newBill2)=>{
        return res.status(201).json({
          success: true,
          message: 'Đã tao hoa don thành công',
          Bill: newBill,
      });
    });
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
exports.thongkehdbynv = function(req,res){
  let id = req.body.id;
  let skipCount = req.body.skipCount;
  let pageSize = req.body.pageSize;
  Bill.find({idnv: id}).skip(skipCount).limit(pageSize).exec((error,Billinfo) =>{
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
exports.thongkedoanhthu = function(req,res){
  let id = req.body.id;
  Bill.aggregate(
    [{
        $match:{"idnv":id}},
        {$group: {
            "tongtien": { $sum: "$tongtien" }
    }},
    {    $project: {
            "_id": "",
            "Doanhthu": "$tongtien"
    }}  
  ]).exec((err,save) => {
      console.log(save);
      return res.status(201).json({
        success: true,
        message: 'Đã tao hoa don thành công',
        Doanhthu: save
    });
});
}
exports.showBill = function(req,res){
  let skipCount = req.body.skipCount;
  let pageSize = req.body.pageSize;
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
exports.showBillperDate = function(req,res){
  let skipCount = req.body.skipCount;
  let pageSize = req.body.pageSize;
  if(req.body.date==""){
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
  }else{
    Bill.find({
      "thoigianhd" : {"$eq": new Date(req.body.date)}
  }).skip(skipCount).limit(pageSize).exec((error,Billinfo) =>{
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
}
exports.loaihd = function(req,res){
  const td = [{text:'Nhập',value:'nhap'},{text:'Xuất',value:'xuat'}];
  res.status(200).json({
    success: true,
    message: 'Thong tin hoa don theo id la:',
    Billinfodetail: td,
  });
}
exports.BillInfoID = function(req,res){
  const id = req.params.id;
  Bill.findById(id).then((infoBill) => {
    const sp = infoBill.sanpham;
    res.status(200).json({
      success: true,
      message: 'Thong tin hoa don theo id la:',
      id: id,
      Billinfodetail: sp,
    });
  }).catch((error)=>{
    res.status(500).json({
      success: false,
      message: 'Khong tim thay thong tin hoa don:',
      err: error.message,
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
  exports.thongkedoanhthucuahang = function(req,res){
    let thang = req.body.thang;
    let nam = req.body.nam;
    Bill.aggregate(
      [ 
        { $project: {
        "year":{"$year":"$thoigianhd"},
        "month":{"$month":"$thoigianhd"},
        "tongtien": { "$sum": "$tongtien" },     
   }},
   { $match:{ 
        "year" : nam,
        "month": thang,     
   }},
   { $group: {
        "_id": "",
        "Doanhthu": { "$sum": "$tongtien" },
   }}  
    ]).exec((err,save) => {
        console.log(save[0].Doanhthu);
        let Doanhthu=save[0].Doanhthu;
        if(Doanhthu != undefined){
        return res.status(201).json({
          success: true,
          message: 'Đã tao doanh thu',
          Doanhthu: save[0].Doanhthu
      });
    }
    else{
      return res.status(304).json({
        success: true,
        message: 'Chưa tạo doanh thu',
        Doanhthu: 0
      })
    }
  });
  }
  exports.thongkecuahang = function(req,res){
    let thang = req.body.thang;
    let nam = req.body.nam;
    Bill.aggregate(
      [ 
        { $project: {
        "year":{"$year":"$thoigianhd"},
        "month":{"$month":"$thoigianhd"},
        "thoigianhd":"$thoigianhd",
        "tongtien":"$tongtien",
   }},
   { $match:{ 
        "year" : nam,
        "month": thang,     
   }} 
    ]).exec((err,save) => {
        console.log(save);
        return res.status(201).json({
          success: true,
          message: 'Đã tao hoa don thành công',
          Doanhthu: save
      });
  });
  }