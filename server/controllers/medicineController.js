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
        giathuoc: req.body.giathuoc,
        donvinhap: req.body.donvinhap,
        hangthuoc: req.body.hangthuoc,
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
    Medicine.find({tenthuoc: { $regex: '.*' + req.body.name + '.*'}}).then((allMedicine) => {
        res.status(200).json({
            success: true,
            message: 'Danh sach mat hang gom:',
            Medicine: allMedicine,
        })
    }).catch((error)=>{
        res.status(500).json({
            success: loi.success,
            message: loi.message,
            err: error.message,
        })
    });
} 
exports.searchbyManuName = function(req,res){
    let perpage = 10;
    let pag = req.params.pa || 1;
    Medicine.find({hangthuoc:{ $regex: '.*' + req.body.name + '.*'}}).skip((perpage*pag)-perpage).limit(perpage).then((manuMedicine) => {
        res.status(200).json({
            success: true,
            message: 'Danh sach mat thuoc theo ten nha san xuat la:',
            Medicine: manuMedicine,
        });
    }).catch((error)=>{
        res.status(500).json({
            success: true,
            message: 'Khong tim thay san pham nao',
            err: error.message,
        });
    });
}