const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    uplaodFiles: [Object]
});

const UploadFile = mongoose.model('UploadFile', fileSchema);

module.exports = UploadFile;