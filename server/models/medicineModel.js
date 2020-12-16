var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const medicineSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenthuoc:{
        type: String,
        required: true,
    },
    mota:{
        type: String,
        required: true,
    },
    giathuocnhap:{
        type: Number,
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
    nhasanxuat:{
        type: String,
        required: true,
    },
    soluong:{
        type: Number,
        required: true,
    },
    danhmuc:{
        type: String,
        required: true,
    },
});
mongoose.model('Medicine',medicineSchema);