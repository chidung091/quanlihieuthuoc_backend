var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserinfoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: {
    type: String,
    required: true,
  },
  ngaysinh: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  sodienthoai: {
    type: Number,
    required:true,
  },
  quequan: {
    type: String,
    required:true,
  },
});
UserinfoSchema.index({'$**': 'text'});

mongoose.model('Userinfo', UserinfoSchema);