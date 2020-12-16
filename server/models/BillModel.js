var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const medicineSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenthuoc:{
        type: String,
        required: true,
    },
    giathuocban:{
        type: Number,
        required: true,
    },
    donvinhap:{
        type: String,
        required: true,
    },
    soluong:{
        type: Number,
        required: true,
    },
    tongtiensp:{
        type: Number,
        default: function() {
            return this.giathuocban*this.soluong
        }
    }
});
const BillSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    loaihd:{
        type: String,
        required: true,
        enum: ['nhap','xuat']
    },
    sanpham:[medicineSchema],
    nguoilaphd: mongoose.Schema.Types.ObjectId,
    thoigianhd:{
        type: Date,
        default: Date.now,
    },
});
mongoose.model('Bill',BillSchema);
var Bill = mongoose.model('Bill',BillSchema);
Bill.aggregate(
    [{
        $unwind: '$sanpham'},
        {$group: {
            "_id": "$_id",
            "tongtien": { $sum: "$sanpham.tongtiensp" }
    }}]
)