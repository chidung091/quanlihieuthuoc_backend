var mongoose = require('mongoose');
Bill = mongoose.model('Bill');
Medicine = mongoose.model('Medicine');

exports.createBill = function(req,res){

    const bill = new Bill({
        _id: mongoose.Types.ObjectId(),
        loaihd: req.body.loaihd,
        sanpham: req.body.sanpham,
        nguoilaphd: req.body.nguoilaphd,
        thoigianhd: req.body.thoigianhd,
    });
    return bill.save().then((newBill) => {
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